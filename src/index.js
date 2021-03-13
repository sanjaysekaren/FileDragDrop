import React from 'react'
import ReactDOM from 'react-dom'
import {useFileUpload} from './component'

const OnDrop = () => <span>Drop here</span>
const Beforedrop = () => <span>Drop the file or click here to select</span>

const onSubmit = e => {
  e.preventDefault()
  console.log('e')
}
const FileUpload = () => {
  const [
    {isDragging},
    register,
    getDragDropContainerProps,
    getInputProps,
  ] = useFileUpload()
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
            name: 'file',
            multiple: true,
            acceptableextensions: ['pdf', 'jpeg', 'jpg'],
            filecountlimit: 3,
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
      <FileUpload />
    </>
  </React.StrictMode>,
  document.getElementById('root'),
)
