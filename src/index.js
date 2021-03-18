import React from 'react'
import ReactDOM from 'react-dom'
import {useFileUpload} from './component'
import UserForm from './example'

const OnDrop = () => <span>Drop here</span>
const Beforedrop = () => <span>Drop the file or click here to select</span>

const onSubmit = e => {
  e.preventDefault()
  console.log('e')
}
const FileUpload = () => {
  const [
    {isDragging, files},
    register,
    getDragDropContainerProps,
    getInputProps,
  ] = useFileUpload()
  console.log(files, 'files')
  return (
    <form onSubmit={onSubmit} action="">
      <div
        {...getDragDropContainerProps({
          customStyle: {
            backgroundColor: '#ccc',
          },
        })}
      >
        <input
          ref={register}
          {...getInputProps({
            name: 'images',
            multiple: true,
            acceptableextensions: ['pdf', 'jpeg', 'jpg'],
            filecountlimit: 3,
            onChange: event => {
              console.log(event)
            },
          })}
        />
        {isDragging ? <OnDrop /> : <Beforedrop />}
      </div>
    </form>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <>
      {/* <FileUpload /> */}
      <UserForm />
    </>
  </React.StrictMode>,
  document.getElementById('root'),
)
