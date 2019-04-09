import React from "react";
import ReactDOM from "react-dom";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState
} from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import Editor from 'draft-js-plugins-editor';
import PluginEditor, { CustomEditor } from "./components/customEditor/customEditor";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { initialState } from './utils/constants';

import '../node_modules/draft-js-image-plugin/lib/plugin.css';

/**
 * custom editor block
 */
import composeDecorators from "./utils/composeDecorators";
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

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });
const plugins = [
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin
];
/**
 * end custom editor block
 */



class App extends React.Component {
  constructor(props) {
    super(props);
    const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
    const contentBlock = htmlToDraft(html);
    // if (contentBlock) {
    //   const contentState = ContentState.createFromBlockArray(
    //     contentBlock.contentBlocks
    //   );
    //   const editorState = EditorState.createWithContent(contentState);
    const editorState = EditorState.createWithContent(
      convertFromRaw(initialState)
    );
    this.state = {
      editorState
    };
    //}
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  render() {
    const { editorState } = this.state;

    const editorStyle = {
      boxSizing: 'border-box',
      border: '1px solid #ddd',
      cursor: 'text',
      padding: '16px',
      borderRadius: '2px',
      marginBottom: '2em',
      boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
      background: '#fefefe'
    }

    return (
      <div>
        <div style={editorStyle}>
          <Editor
            editorState={editorState}
            onChange={this.onEditorStateChange}
            plugins={plugins}
          // ref={(element) => { this.editor = element; }}
          />
          <AlignmentTool />
        </div>
        {/* <PluginEditor
          plugins={[{ "image": ["resizable", "align", "focus", "blockDnd"] }]}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={this.onEditorStateChange}
          editorState={editorState}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "image",
              "history"
            ],
            fontFamily: {
              options: [
                "Arial",
                "Comic Sans MS",
                "Consolas",
                "Courier New",
                "Georgia",
                "Tahoma",
                "Times New Roman",
                "Verdana"
              ],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined
            }
          }}
        /> */}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
