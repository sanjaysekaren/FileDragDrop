import {useReducer, useRef, useCallback} from 'react'

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
      return updateState(state, action)
    default:
      return {
        isDragging: false,
      }
  }
}

const updateState = (state, action) => {
  return {
    ...state,
    files: [
      ...state.files,
      ...action.payload.slice(0, state.filecountlimit - state.files.length),
    ],
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
  ...props
} = {}) {
  const {current: initialState} = useRef({...defaultState, ...props})
  const fileRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    files,
    multiple,
    filecountlimit,
    acceptableextensions,
  } = state
  const register = ref => (fileRef.current = ref)

  const applyUserProvidedSlices = useCallback(
    newFiles => (multiple ? newFiles : [newFiles[0]]),
    [multiple],
  )

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
    files => {
      let filteredFiles = []
      const validators = []
      validators.push(customValidation)
      if (acceptableextensions.length) {
        validators.push(fileExtensionValidation)
      }
      files?.map(file => {
        validators.map(validate => {
          !file[ERROR] && validate(file)
        })
        !file[ERROR] && filteredFiles.push(file)
      })
      return applyUserProvidedSlices(filteredFiles)
    },
    [
      customValidation,
      fileExtensionValidation,
      acceptableextensions,
      applyUserProvidedSlices,
    ],
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

  const onDropEvent = useCallback(
    event => {
      const {dataTransfer} = event
      if (dataTransfer?.items?.length) {
        simpleAction(actionTypes.FILE_DROPPED, dispatch)
        handleFiles(validateFileInput([...dataTransfer.files]))
        dataTransfer.clearData()
      }
    },
    [handleFiles, validateFileInput],
  )

  const onClickEvent = useCallback(
    ({target}) => fileAttrId !== target.dataset?.id && fileRef.current?.click(),
    [],
  )

  const onChangeEvent = useCallback(
    event => handleFiles(validateFileInput([...event.target.files])),
    [handleFiles, validateFileInput],
  )

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

  return [
    state,
    register,
    getDragDropContainerProps,
    getInputProps,
  ]
}
