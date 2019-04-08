import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Image from "./image";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState
} from "draft-js";
import CustomEditor from "./customEditor";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import composeDecorators from "./composeDecorators";

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
const initialState = {
  entityMap: {
    "0": {
      type: "IMAGE",
      mutability: "IMMUTABLE",
      data: {
        src:
          "https://www.draft-js-plugins.com/images/canada-landscape-small.jpg"
      }
    }
  },
  blocks: [
    {
      key: "9gm3s",
      text:
        "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "ov7r",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0
        }
      ],
      data: {}
    },
    {
      key: "e23a8",
      text: "See advanced examples further down …",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};

class App extends React.Component {
  constructor(props) {
    super(props);
    // const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
    // const contentBlock = htmlToDraft(html);
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
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  // onInsertImage = () => {
  //   debugger;
  //   const { editorState } = this.state;
  //   let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  //   html +=
  //     '<image src="https://www.google.com/webhp?hl=en&ictx=2&sa=X&ved=0ahUKEwi2p9HcqLnhAhUiTd8KHTyyAywQPQgH"></image>';
  //   const contentBlock = htmlToDraft(html);
  //   if (contentBlock) {
  //     const contentState = ContentState.createFromBlockArray(
  //       contentBlock.contentBlocks
  //     );
  //     const editorState = EditorState.createWithContent(contentState);
  //     this.setState({
  //       editorState
  //     });
  //   }
  // };
  render() {
    const { editorState } = this.state;

    return (
      <MuiThemeProvider>
        <div>
          <CustomEditor
            plugins={plugins}
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
          />
          <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />
          {/* <button onClick={this.onInsertImage}>Insert image</button> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
