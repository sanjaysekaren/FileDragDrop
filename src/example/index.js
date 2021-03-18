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
  FileContainer,
  logoStyle,
  dropText,
} from './custom.style'

const UserForm = () => {
  const [
    {isDragging, files},
    register,
    getDragDropContainerProps,
    getInputProps,
  ] = useFileUpload()
  console.log(files, files[0], files[1], typeof files, typeof files[0])

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
          <FieldWrapper id='dropContainer'
            {...getDragDropContainerProps({
              customStyle: {
                backgroundColor: '#ccc',
              },
            })}
          >
            {/* <label> */}
            {/* <img style={logoStyle} key={'icon'} src={logo} /> */}
            {/* <input
              ref={register}
              {...getInputProps({
                name: 'images',
                multiple: true,
                acceptableextensions: ['pdf', 'jpeg', 'jpg'],
                customStyle: {
                  visibility: 'hidden',
                },
              })}
            /> */}
            {/* </label> */}
            {/* <input style={{display:'none'}} type='file' ref={register} onChange={handleFiles}/> */}
            <span style={dropText}>
              {isDragging ? 'Drop here' : 'Select or Drop a file'}
            </span>
          </FieldWrapper>
        </FieldWrapper>
        {files &&
          files.map(file => (
            <img
              className="preview"
              style={{display: 'block', width: '150px', height: '200px'}}
              key={file.name}
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          ))}
        <FieldWrapper>
          <SubmitButton>Submit</SubmitButton>
        </FieldWrapper>
      </Wrapper>
    </div>
  )
}

export default UserForm
