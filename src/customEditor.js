import { Editor } from "react-draft-wysiwyg";
import React from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Map } from "immutable";
import proxies from "./proxies";
import moveSelectionToEnd from "./moveSelectionToEnd";
import resolveDecorators from "./resolveDecorators";
import defaultKeyBindings from "./defaultKeyBindings";
import defaultKeyCommands from "./defaultKeyCommands";
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// export interface IProps {
//   editorState: EditorState;
//   toolbar: any;
//   editorRef: Function;
//   onChange: Function;
//   readOnly: boolean;
// }

const getDecoratorLength = obj => {
  let decorators;

  if (obj.decorators != null) {
    decorators = obj.decorators;
  } else if (obj._decorators != null) {
    decorators = obj._decorators;
  }

  return decorators.size != null ? decorators.size : decorators.length;
};

export default class CustomEditor extends React.Component {
  editor;
  constructor(props) {
    super(props);

    const plugins = [this.props, ...this.resolvePlugins()];
    plugins.forEach(plugin => {
      if (typeof plugin.initialize !== "function") return;
      plugin.initialize(this.getPluginMethods());
    });

    // attach proxy methods like `focus` or `blur`
    proxies.forEach(method => {
      this[method] = (...args) => this.editor[method](...args);
    });

    this.state = { readOnly: false }; // TODO for Nik: ask ben why this is relevent
  }
  componentWillMount() {
    const decorator = resolveDecorators(
      this.props,
      this.getEditorState,
      this.onEditorStateChange
    );

    const editorState = EditorState.set(this.props.editorState, { decorator });
    this.onEditorStateChange(moveSelectionToEnd(editorState));
  }
  componentWillReceiveProps(next) {
    const curr = this.props;
    const currDec = curr.editorState.getDecorator();
    const nextDec = next.editorState.getDecorator();

    // If there is not current decorator, there's nothing to carry over to the next editor state
    if (!currDec) return;
    // If the current decorator is the same as the new one, don't call onChange to avoid infinite loops
    if (currDec === nextDec) return;
    // If the old and the new decorator are the same, but no the same object, also don't call onChange to avoid infinite loops
    if (
      currDec &&
      nextDec &&
      getDecoratorLength(currDec) === getDecoratorLength(nextDec)
    )
      return;

    const editorState = EditorState.set(next.editorState, {
      decorator: currDec
    });
    this.onEditorStateChange(moveSelectionToEnd(editorState));
  }

  componentWillUnmount() {
    this.resolvePlugins().forEach(plugin => {
      if (plugin.willUnmount) {
        plugin.willUnmount({
          getEditorState: this.getEditorState,
          setEditorState: this.onEditorStateChange
        });
      }
    });
  }

  // Cycle through the plugins, changing the editor state with what the plugins
  // changed (or didn't)
  onEditorStateChange = editorState => {
    let newEditorState = editorState;
    this.resolvePlugins().forEach(plugin => {
      if (plugin.onChange) {
        newEditorState = plugin.onChange(
          newEditorState,
          this.getPluginMethods()
        );
      }
    });

    if (this.props.onEditorStateChange) {
      this.props.onEditorStateChange(newEditorState, this.getPluginMethods());
    }
  };
  editorRef = (ref) => {
    this.editor = ref;
  };
  getPlugins = () => this.props.plugins.slice(0);
  getProps = () => ({ ...this.props });

  // TODO further down in render we use readOnly={this.props.readOnly || this.state.readOnly}. Ask Ben why readOnly is here just from the props? Why would plugins use this instead of just taking it from getProps?
  getReadOnly = () => this.props.readOnly;
  setReadOnly = readOnly => {
    if (readOnly !== this.state.readOnly) this.setState({ readOnly });
  };

  getEditorRef = () => this.editor;

  getEditorState = () => this.props.editorState;

  getPluginMethods = () => ({
    getPlugins: this.getPlugins,
    getProps: this.getProps,
    setEditorState: this.onEditorStateChange,
    getEditorState: this.getEditorState,
    getReadOnly: this.getReadOnly,
    setReadOnly: this.setReadOnly,
    getEditorRef: this.getEditorRef
  });
  createEventHooks = (methodName, plugins) => (...args) => {
    const newArgs = [].slice.apply(args);
    newArgs.push(this.getPluginMethods());

    return plugins.some(
      plugin =>
        typeof plugin[methodName] === "function" &&
        plugin[methodName](...newArgs) === true
    );
  };
  createHandleHooks = (methodName, plugins) => (...args) => {
    const newArgs = [].slice.apply(args);
    newArgs.push(this.getPluginMethods());

    return plugins.some(
      plugin =>
        typeof plugin[methodName] === "function" &&
        plugin[methodName](...newArgs) === "handled"
    )
      ? "handled"
      : "not-handled";
  };
  createFnHooks = (methodName, plugins) => (...args) => {
    const newArgs = [].slice.apply(args);

    newArgs.push(this.getPluginMethods());

    if (methodName === "blockRendererFn") {
      let block = { props: {} };
      plugins.forEach(plugin => {
        if (typeof plugin[methodName] !== "function") return;
        const result = plugin[methodName](...newArgs);
        if (result !== undefined && result !== null) {
          const { props: pluginProps, ...pluginRest } = result; // eslint-disable-line no-use-before-define
          const { props, ...rest } = block; // eslint-disable-line no-use-before-define
          block = {
            ...rest,
            ...pluginRest,
            props: { ...props, ...pluginProps }
          };
        }
      });

      return block.component ? block : false;
    } else if (methodName === "blockStyleFn") {
      let styles;
      plugins.forEach(plugin => {
        if (typeof plugin[methodName] !== "function") return;
        const result = plugin[methodName](...newArgs);
        if (result !== undefined && result !== null) {
          styles = (styles ? `${styles} ` : "") + result;
        }
      });

      return styles || "";
    }

    let result;
    const wasHandled = plugins.some(plugin => {
      if (typeof plugin[methodName] !== "function") return false;
      result = plugin[methodName](...newArgs);
      return result !== undefined;
    });
    return wasHandled ? result : false;
  };
  createPluginHooks = () => {
    const pluginHooks = {};
    const eventHookKeys = [];
    const handleHookKeys = [];
    const fnHookKeys = [];
    const plugins = [this.props, ...this.resolvePlugins()];

    plugins.forEach(plugin => {
      Object.keys(plugin).forEach(attrName => {
        if (attrName === "onChange") return;

        // if `attrName` has been added as a hook key already, ignore this one
        if (
          eventHookKeys.indexOf(attrName) !== -1 ||
          fnHookKeys.indexOf(attrName) !== -1
        )
          return;

        const isEventHookKey = attrName.indexOf("on") === 0;
        if (isEventHookKey) {
          eventHookKeys.push(attrName);
          return;
        }

        const isHandleHookKey = attrName.indexOf("handle") === 0;
        if (isHandleHookKey) {
          handleHookKeys.push(attrName);
          return;
        }

        // checks if `attrName` ends with 'Fn'
        const isFnHookKey = attrName.length - 2 === attrName.indexOf("Fn");
        if (isFnHookKey) {
          fnHookKeys.push(attrName);
        }
      });
    });

    eventHookKeys.forEach(attrName => {
      pluginHooks[attrName] = this.createEventHooks(attrName, plugins);
    });

    handleHookKeys.forEach(attrName => {
      pluginHooks[attrName] = this.createHandleHooks(attrName, plugins);
    });

    fnHookKeys.forEach(attrName => {
      pluginHooks[attrName] = this.createFnHooks(attrName, plugins);
    });

    return pluginHooks;
  };
  resolvePlugins = () => {
    const plugins = (this.props.plugins || []).slice(0);
    if (this.props.defaultKeyBindings === true) {
      plugins.push(defaultKeyBindings);
    }
    if (this.props.defaultKeyCommands === true) {
      plugins.push(defaultKeyCommands);
    }

    return plugins;
  };
  resolveAccessibilityProps = () => {
    let accessibilityProps = {};
    const plugins = [this.props, ...this.resolvePlugins()];
    plugins.forEach(plugin => {
      if (typeof plugin.getAccessibilityProps !== "function") return;
      const props = plugin.getAccessibilityProps();
      const popupProps = {};

      if (accessibilityProps.ariaHasPopup === undefined) {
        popupProps.ariaHasPopup = props.ariaHasPopup;
      } else if (props.ariaHasPopup === "true") {
        popupProps.ariaHasPopup = "true";
      }

      if (accessibilityProps.ariaExpanded === undefined) {
        popupProps.ariaExpanded = props.ariaExpanded;
      } else if (props.ariaExpanded === true) {
        popupProps.ariaExpanded = true;
      }

      accessibilityProps = {
        ...accessibilityProps,
        ...props,
        ...popupProps
      };
    });

    return accessibilityProps;
  };

  render() {
    const pluginHooks = this.createPluginHooks();
    const accessibilityProps = this.resolveAccessibilityProps();

    return (
      <Editor
        wrapperClassName={this.props.wrapperClassName}
        editorClassName={this.props.editorClassName}
        toolbarClassName={this.props.toolbarClassName}
        onEditorStateChange={this.onEditorStateChange}
        editorState={this.props.editorState}
        toolbar={this.props.toolbar}
        editorRef={this.editorRef}
        readOnly={this.props.readOnly || this.state.readOnly}
        {...this.props}
        {...accessibilityProps}
        {...pluginHooks}
      // customStyleMap={customStyleMap}
      // blockRenderMap={blockRenderMap}
      />
    );
  }
}
