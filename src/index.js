import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import FileDragDropCompoenent from './component/FileDragDrop'
import {useFileUpload} from './component/useFileUpload'
// useFileUpload();
// either it should be able to show drag & drop or
// it should simply show button with image or something

const OnDrop = () => <span>Drop here</span>
const Beforedrop = () => <span>Drop the file or click here to select</span>

const FileUpload = () => {
  const [{drag, files}, getDragDropContainerProps] = useFileUpload({
    multiple: true,
    acceptableExtensions: ['pdf', 'jpeg', 'jpg'],
    fileCountLimit: 3,
  })
  console.log('files,', files)
  return (
    <div
      {...getDragDropContainerProps({
        customStyle: {
          backgroundColor: '#ccc',
        },
      })}
    >
      {drag ? <OnDrop /> : <Beforedrop />}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <>
      <FileUpload />
      {/* <FileDragDropCompoenent
        handleFileDrop={(val, msg) => console.log(val, msg)}
        customOuterDropAreaStyle={{
          height: 150,
          width: 500,
          border: 'dashed gray 5px ',
          borderRadius: '6px',
        }}
        dropText={'drop here'}
        isDropTextVisible
        multiple
        acceptableExtensions={['pdf', 'jpeg', 'jpg']}
        acceptableSize={5}
        // fileNameRegex={/^([a-z0-9])$/}
        fileCountLimit={3}
        isPreviewRequired
      >
        Drag and Drop file here
      </FileDragDropCompoenent>
       */}
    </>
  </React.StrictMode>,
  document.getElementById('root'),
)
