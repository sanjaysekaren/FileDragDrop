import React, { useState } from "react";
import * as styles from "./FileDragDrop.style";

const FileDragDropComponent = (props) => {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([]);
  const [errMessage, setErrMessage] = useState([]);
  let dragCounter = 0;

  const {
    acceptableExtensions,
    acceptableSize,
    fileNameRegex,
    fileCountLimit,
  } = props;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length) {
      setDrag(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter -= 1;
    if (dragCounter === -1) {
      setDrag(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.items && e.dataTransfer.items.length) {
      handleFiles(e.dataTransfer.files);
      console.log(files, e.dataTransfer.items);
      props.handleFileDrop(props.multiple ? files : files[0], errMessage);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
  };

  const handleFiles = (newFiles) => {
    let updatedFiles = files;
    let updatedErrMessages = errMessage;
    if (
      acceptableExtensions ||
      acceptableSize ||
      fileNameRegex ||
      fileCountLimit
    ) {
      for (const file of newFiles) {
        if (!fileCountLimit || updatedFiles.length < fileCountLimit) {
          if (
            (!acceptableExtensions ||
              acceptableExtensions.includes(
                file.name.split(".").pop().toLowerCase()
              )) &&
            (!acceptableSize || acceptableSize * 1024 * 1024 > file.size) &&
            (!fileNameRegex || fileNameRegex.test(file.name))
          ) {
            !updatedFiles.map((file) => file.name).includes(file.name) &&
              updatedFiles.push(file);
          }
          if (
            acceptableExtensions &&
            !acceptableExtensions.includes(
              file.name.split(".").pop().toLowerCase()
            )
          ) {
            !updatedErrMessages.includes(
              `${file.name}:Please upload a valid format file ${acceptableExtensions}`
            ) &&
              updatedErrMessages.push(
                `${file.name}:Please upload a valid format file ${acceptableExtensions}`
              );
          }
          if (acceptableSize && !acceptableSize * 1024 * 1024 > file.size) {
            !updatedErrMessages.includes(
              `${file.name}:Please upload file less than${acceptableSize}`
            ) &&
              updatedErrMessages.push(
                `${file.name}:Please upload file less than${acceptableSize}`
              );
          }
          if (fileNameRegex && !fileNameRegex.test(file.name)) {
            !updatedErrMessages.includes(
              `${file.name}:Please upload file with valid name`
            ) &&
              updatedErrMessages.push(
                `${file.name}:Please upload file with valid name`
              );
          }
        } else {
          !updatedErrMessages.includes(
            `Only max of ${fileCountLimit} allowed`
          ) && updatedErrMessages.push(`Only max of ${fileCountLimit} allowed`);
        }
      }
      setFiles((files) => [...files, ...updatedFiles]);
      setErrMessage((errMessage) => [...errMessage, ...updatedErrMessages]);
    } else {
      setFiles(...newFiles);
    }
    updatedFiles = [];
    updatedErrMessages = [];
  };

  return (
    <div>
      {props.isPreviewRequired &&
        files &&
        files.map((file) => (
          <img
            className="preview"
            style={styles.previewStyle}
            key={file.name}
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
        ))}
      <div style={{ display: "inline-block", position: "relative" }}>
        <div
          className="DropConatiner"
          style={
            props.customOuterDropAreaStyle || styles.DropContainerDefaultStyle
          }
          onDragEnter={(e) => handleDragIn(e)}
          onDragLeave={(e) => handleDragOut(e)}
          onDragOver={(e) => handleDrag(e)}
          onDrop={(e) => handleDrop(e)}
        >
          {drag && (
            <div
              className="DropConatiner-Border"
              style={
                props.customDropContainerBorderStyle ||
                styles.DropConatinerBorderDefaultStyle
              }
            >
              <div
                className="DropContainer-Text"
                style={
                  props.customDropConatinerTextStyle ||
                  styles.DropConatinerTextDefaultStyle
                }
              >
                <div>{props.isDropTextVisible && props.dropText}</div>
              </div>
            </div>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default FileDragDropComponent;
