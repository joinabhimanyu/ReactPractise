import React from "react";
import ReactDOM from "react-dom";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState
} from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import Editor from 'draft-js-plugins-editor';
// import PluginEditor, { CustomEditor } from "./components/customEditor/customEditor";
import { PluginEditor, initialState } from './lib';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";


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

    return (
      <div>
        <PluginEditor
          plugins={[{ "image": ["resizable", "align", "focus", "blockDnd"] }]}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={this.onEditorStateChange}
          editorState={editorState}
          defaultBlockRenderMap={true}
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
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
