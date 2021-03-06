import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FileDragDropCompoenent from "./component/FileDragDrop";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <FileDragDropCompoenent
      handleFileDrop={(val, msg) => console.log(val, msg)}
      customOuterDropAreaStyle={{
        height: 150,
        width: 500,
        border: "dashed gray 5px ",
        borderRadius: "6px",
      }}
      dropText={"drop here"}
      isDropTextVisible
      multiple
      acceptableExtensions={["pdf", "jpeg", "jpg"]}
      acceptableSize={5}
      // fileNameRegex={/^([a-z0-9])$/}
      fileCountLimit={3}
      isPreviewRequired
    >
      Drag and Drop file here
    </FileDragDropCompoenent>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
