export function usePreviewFiles(files, previewCustomStyle) {
  const defaultStyle = {
    display: 'block',
    width: '200px',
    height: '250px',
    margin: '5px',
  }
  const previewFiles = (
    <div>
      {files?.map(file => (
        <span style={{display: 'inline-block'}}>
          <img
            className="preview"
            alt={file.name}
            style={previewCustomStyle || defaultStyle}
            key={file.name}
            src={URL.createObjectURL(file)}
          />
        </span>
      ))}
    </div>
  )
  return {previewFiles}
}
