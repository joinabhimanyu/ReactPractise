import { Editor } from "react-draft-wysiwyg";
// import Editor from 'draft-js-plugins-editor';
import React, { Fragment } from "react";
import { EditorState, convertToRaw, ContentState, DefaultDraftBlockRenderMap } from "draft-js";
import { Map } from "immutable";
import proxies from "./proxies";
import moveSelectionToEnd from "./moveSelectionToEnd";
import resolveDecorators from "./resolveDecorators";
import defaultKeyBindings from "./defaultKeyBindings";
import defaultKeyCommands from "./defaultKeyCommands";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../node_modules/draft-js-image-plugin/lib/plugin.css';
import '../../../node_modules/draft-js-alignment-plugin/lib/plugin.css';

import composeDecorators from "../utils/composeDecorators";
import createImagePlugin from "draft-js-image-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const getDecoratorLength = obj => {
  let decorators;

  if (obj.decorators != null) {
    decorators = obj.decorators;
  } else if (obj._decorators != null) {
    decorators = obj._decorators;
  }

  return decorators.size != null ? decorators.size : decorators.length;
};

const editorStyle = {
  boxSizing: 'border-box',
  border: '1px solid #ddd',
  cursor: 'text',
  padding: '16px',
  borderRadius: '2px',
  marginBottom: '2em',
  boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
  background: '#fefefe'
};

// plugins: [{"image":["resizable","align","focus","blockDnd"]]
export default class PluginEditor extends React.Component {
  constructor(props) {
    super(props);
    const plugins = this.constructState();
    this.state = {
      plugins
    };
  }
  constructState() {
    const { plugins: props_plugins } = this.props;
    let state_plugins;
    if (props_plugins) {
      // image plugin
      const ifilter = props_plugins.filter(x => x.hasOwnProperty('image'));
      if (ifilter) {
        const image = ifilter[0]["image"];
        if (!image) {
          // no plugin
          const imagePlugin = createImagePlugin();
          const plugins = [imagePlugin];
          state_plugins = plugins;
        } else {
          const decorators = [];
          const plugins = [];
          // resizable
          if (image.filter(x => x === 'resizable')) {
            decorators.push(resizeablePlugin.decorator);
            plugins.push(resizeablePlugin);
          }
          if (image.filter(x => x === 'align')) {
            decorators.push(alignmentPlugin.decorator);
            plugins.push(alignmentPlugin);
          }
          if (image.filter(x => x === 'focus')) {
            decorators.push(focusPlugin.decorator);
            plugins.push(focusPlugin);
          }
          if (image.filter(x => x === 'blockDnd')) {
            decorators.push(blockDndPlugin.decorator);
            plugins.push(blockDndPlugin);
          }
          const decorator = composeDecorators(...decorators);
          const imagePlugin = createImagePlugin({ decorator });
          plugins.push(imagePlugin);
          state_plugins = plugins;
        }
      }
    }
    return state_plugins;
  }
  render() {
    const { plugins: plugin_props, ...editorConfig } = this.props;
    const { plugins: state_plugins } = this.state;
    let editor = null;
    if (state_plugins) {
      const align = state_plugins.filter(x => x.hasOwnProperty('AlignmentTool'));
      if (align && align.length > 0) {
        editor = <CustomEditor
          plugins={state_plugins}
          {...editorConfig}
        />;
      } else {
        editor = <CustomEditor
          plugins={state_plugins}
          {...editorConfig}
        />
      }
    } else {
      editor = <CustomEditor
        {...editorConfig}
      />
    }
    return (
      <Fragment>
        {editor}
      </Fragment>
    )
  }
}

export class CustomEditor extends React.Component {
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

    this.state = { readOnly: false, plugins: null }; // TODO for Nik: ask ben why this is relevent
  }
  componentWillMount() {
    const decorator = resolveDecorators(
      this.props,
      this.getEditorState,
      this.onChange
    );

    const editorState = EditorState.set(this.props.editorState, { decorator });
    this.onChange(moveSelectionToEnd(editorState));
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
    this.onChange(moveSelectionToEnd(editorState));
  }

  componentWillUnmount() {
    this.resolvePlugins().forEach(plugin => {
      if (plugin.willUnmount) {
        plugin.willUnmount({
          getEditorState: this.getEditorState,
          setEditorState: this.onChange
        });
      }
    });
  }

  // Cycle through the plugins, changing the editor state with what the plugins
  // changed (or didn't)
  onChange = editorState => {
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
    setEditorState: this.onChange,
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
  resolveCustomStyleMap = () => (
    this.props.plugins
      .filter((plug) => plug.customStyleMap !== undefined)
      .map((plug) => plug.customStyleMap)
      .concat([this.props.customStyleMap])
      .reduce((styles, style) => (
        {
          ...styles,
          ...style,
        }
      ), {})
  );
  resolveblockRenderMap = () => {
    let blockRenderMap = this.props.plugins
      .filter((plug) => plug.blockRenderMap !== undefined)
      .reduce((maps, plug) => maps.merge(plug.blockRenderMap), Map({}));
    if (this.props.defaultBlockRenderMap) {
      blockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
    }
    if (this.props.blockRenderMap) {
      blockRenderMap = blockRenderMap.merge(this.props.blockRenderMap);
    }
    return blockRenderMap;
  }
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
    const { keyBindingFn, ...hooks } = pluginHooks;
    const accessibilityProps = this.resolveAccessibilityProps();
    const customStyleMap = this.resolveCustomStyleMap();
    const blockRenderMap = this.resolveblockRenderMap();
    return (
      <div style={editorStyle}>
        <Editor
          editorRef={this.editorRef}
          customStyleMap={customStyleMap}
          blockRenderMap={blockRenderMap}
          {...this.props}
          {...accessibilityProps}
          {...hooks}
          onEditorStateChange={this.onChange}
        />
        <AlignmentTool />
        {/* <Editor
          onChange={this.onEditorStateChange}
          editorState={this.props.editorState}
          {...this.props}
        /> */}
      </div>
    );
  }
}
