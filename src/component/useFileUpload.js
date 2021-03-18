import {useEffect, useReducer, useRef, useCallback} from 'react'

const callfn = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

const DEFAULT_EXTENSIONS = []
const FILE = 'file'
const ERROR = 'error'

export const actionTypes = {
  FILE_DRAGGED: 'FILE_DRAGGED',
  FILE_DROPPED: 'FILE_DROPPED',
  ADD_FILES: 'ADD_FILES',
}

const fileAttrId = 'file-input'

const preventNavigation = event => event.preventDefault()

export const dragDropReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FILE_DRAGGED:
      return {
        ...state,
        isDragging: true,
      }
    case actionTypes.FILE_DROPPED:
      return {
        ...state,
        isDragging: false,
      }
    case actionTypes.ADD_FILES:
      return {
        ...state,
        files: [...state.files, ...action.payload],
      }
    default:
      return {
        isDragging: false,
      }
  }
}

const defaultStyle = {
  width: '250px',
  height: '400px',
  border: '1px dashed gray',
  borderRadius: '3px',
}

const defaultState = {
  files: [],
  errors: {},
  multiple: false,
  acceptableextensions: DEFAULT_EXTENSIONS,
  filecountlimit: 0,
}

const simpleAction = (type, dispatch) => dispatch({type})

export function useFileUpload({
  reducer = dragDropReducer,
  customValidation = () => {},
  validate,
  ...props
} = {}) {
  const {current: initialState} = useRef({...defaultState, ...props})
  const fileRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const {files, multiple, filecountlimit, acceptableextensions} = state
  const register = ref => (fileRef.current = ref)

  const fileExtensionValidation = useCallback(
    file => {
      file[ERROR] = ''
      if (
        acceptableextensions.length &&
        !acceptableextensions.includes(file.name.split('.').pop().toLowerCase())
      ) {
        file[ERROR] = 'Invalid file extensions'
      }
      return file
    },
    [acceptableextensions],
  )

  const validateFileInput = useCallback(
    file => {
      const validators = []
      validators.push(customValidation)
      if (acceptableextensions.length) {
        validators.push(fileExtensionValidation)
      }
      validators.map(validate => !file[ERROR] && validate(file))
    },
    [customValidation, fileExtensionValidation, acceptableextensions],
  )

  const onDragEnterEvent = useCallback(event => {
    if (event.dataTransfer?.items?.length)
      simpleAction(actionTypes.FILE_DRAGGED, dispatch)
  }, [])

  const handleFiles = useCallback(
    newFiles => dispatch({type: actionTypes.ADD_FILES, payload: newFiles}),
    [],
  )

  const onDragLeaveEvent = useCallback(
    () => dispatch({type: actionTypes.FILE_DROPPED}),
    [],
  )

  const applyUserProvidedSlices = useCallback(
    files => {
      let filePayload = []
      if (multiple) {
        if (filecountlimit) {
          filePayload = [files.slice(0, filecountlimit)]
        } else {
          filePayload = [files]
        }
      } else {
        filePayload = [files[0]]
      }
      return filePayload
    },
    [multiple, filecountlimit],
  )

  const onDropEvent = useCallback(
    event => {
      const {dataTransfer} = event
      if (dataTransfer?.items?.length) {
        simpleAction(actionTypes.FILE_DROPPED, dispatch)
        handleFiles(applyUserProvidedSlices(dataTransfer.files))
        dataTransfer.clearData()
      }
    },
    [handleFiles, applyUserProvidedSlices],
  )

  const onClickEvent = useCallback(
    ({target}) => fileAttrId !== target.dataset?.id && fileRef.current?.click(),
    [],
  )

  const onChangeEvent = useCallback(event => handleFiles(event.target.files), [
    handleFiles,
  ])

  const getDragDropContainerProps = useCallback(
    ({
      onDragOver,
      onDragEnter,
      onDragLeave,
      onDrop,
      id,
      customStyle = {},
      ...props
    } = {}) => {
      return {
        onClick: onClickEvent,
        onDragOver: callfn(preventNavigation, onDragOver),
        onDragEnter: callfn(preventNavigation, onDragEnterEvent, onDragEnter),
        onDragLeave: callfn(preventNavigation, onDragLeaveEvent, onDragLeave),
        onDrop: callfn(preventNavigation, onDropEvent, onDrop),
        style: {
          ...defaultStyle,
          ...customStyle,
        },
        ...props,
      }
    },
    [onClickEvent, onDragEnterEvent, onDragLeaveEvent, onDropEvent],
  )

  const getInputProps = useCallback(
    ({onClick, onChange, customStyle = {}, type, ...props} = {}) => {
      return {
        'data-id': fileAttrId,
        type: FILE,
        name: FILE,
        multiple,
        acceptableextensions,
        filecountlimit,
        onChange: callfn(onChangeEvent, onChange),
        ...props,
        style: {
          ...customStyle,
        },
      }
    },
    [multiple, acceptableextensions, filecountlimit, onChangeEvent],
  )

  useEffect(() => {
    files.length && files.map(file => validateFileInput(file))
  }, [files, validateFileInput])

  return [state, register, getDragDropContainerProps, getInputProps]
}
