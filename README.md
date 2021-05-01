# react-drag-drop-hook

## Features

- File Select
- File Drop and Drop
- File Preview Configurable
- Custom Validation
- Custom UI & Style

## Installation

```sh
yarn add react-drag-drop-hook
# or
npm i -s react-drag-drop-hook
```

## Basic Usage

```js
import React from 'react'
import {useFileUpload, usePreviewFiles} from 'file-drag-drop'

const App = () => {
  const [
    {isDragging, files},
    register,
    getDragDropContainerProps,
    getInputProps,
  ] = useFileUpload({
    customValidation: validateFiles,
    multiple: true,
    filecountlimit: 3,
    acceptableextensions: ['pdf', 'jpg', 'jpeg'],
  })
  const {previewFiles} = usePreviewFiles(files, previewCustomStyle)

  return (
    <div>
      <Wrapper>
        <Title>User Example Form</Title>
        <FieldWrapper>
          <Label>UserName</Label>
          <TextField placeholder="Enter user name"></TextField>
        </FieldWrapper>
        <FieldWrapper>
          <Label>Location</Label>
          <TextField placeholder="Enter location"></TextField>
        </FieldWrapper>
        <FieldWrapper>
          <Label>Upload Proof</Label>
          <FieldWrapper
            id="dropContainer"
            {...getDragDropContainerProps({
              customStyle: {
                backgroundColor: '#ffffff',
                width: '450px',
                height: '200px',
                margin: '2% 30%',
              },
            })}
          >
            <label>
              <img alt="logo" style={logoStyle} key={'icon'} src={logo} />
              <input
                ref={register}
                {...getInputProps({
                  name: 'images',
                  multiple: true,
                  acceptableextensions: ['pdf', 'jpeg', 'jpg'],
                  customStyle: {
                    visibility: 'hidden',
                  },
                })}
              />
            </label>
            <div style={dropText}>
              {isDragging ? 'Drop here' : 'Select or Drop a file'}
            </div>
          </FieldWrapper>
        </FieldWrapper>
        {previewFiles && previewFiles}
        <FieldWrapper>
          <SubmitButton>Submit</SubmitButton>
        </FieldWrapper>
      </Wrapper>
    </div>
  )
}

export default App
```