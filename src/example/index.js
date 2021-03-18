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
              <img alt='logo' style={logoStyle} key={'icon'} src={logo} />
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
            {/* <input style={{display:'none'}} type='file' ref={register} onChange={handleFiles}/> */}
            <div style={dropText}>
              {isDragging ? 'Drop here' : 'Select or Drop a file'}
            </div>
          </FieldWrapper>
        </FieldWrapper>
        {files &&
          files.map(file => (
            <img
              className="preview"
              alt={file.name}
              style={{display: 'block', width: '150px', height: '200px'}}
              key={file.name}
              src={URL.createObjectURL(file)}
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
