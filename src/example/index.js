import React from 'react'
import {useFileUpload} from '../component'
import logo from '../resources/CloudUpload.jpg'
import {
  Wrapper,
  FieldWrapper,
  Label,
  Title,
  TextField,
  SubmitButton,
  logoStyle,
  dropText,
} from './custom.style'

const validateFiles = file => {
  file['error'] = ''
  return file
}

const UserForm = () => {
  const [
    {isDragging, files},
    register,
    getDragDropContainerProps,
    getInputProps,
    previewFiles,
  ] = useFileUpload({
    customValidation: validateFiles,
    multiple: true,
    filecountlimit: 3,
    acceptableextensions: ['pdf', 'jpg', 'jpeg'],
    previewCustomStyle: {
      display: 'block',
      width: '150px',
      height: '200px',
      margin: '5px',
    },
  })

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

export default UserForm
