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
    {isDragging, files},
    register,
    getDragDropContainerProps,
    getInputProps,
  ] = useFileUpload({
    multiple: false,
    acceptableextensions: ['pdf', 'jpeg', 'jpg'],
    filecountlimit: 3,
  })

  console.log(files, 'files')
  return (
    <form onSubmit={onSubmit} action="">
      <div {...getDragDropContainerProps()}>
        <input ref={register} {...getInputProps()} />
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
