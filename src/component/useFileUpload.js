import {useReducer, useRef} from 'react'

const callfn = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

const DEFAULT_EXTENSIONS = ['jpeg', 'jpg']
const FILE = 'file'

export const actionTypes = {
  FILE_DRAGGED: 'FILE_DRAGGED',
  FILE_DROPPED: 'FILE_DROPPED',
  ADD_FILES: 'ADD_FILES',
}

const fileAttrId = 'file-input'

const preventNavigation = event => {
  event.preventDefault()
  event.stopPropagation()
}

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

const isValidFiles = (state, dispatch, newFiles) => {
  // pending validation here
  return true
}

const handleFiles = (state, dispatch, newFiles) => {
  const isValid = isValidFiles(state, dispatch, newFiles)
  if (isValid) {
    dispatch({type: actionTypes.ADD_FILES, payload: newFiles})
  }
}

const defaultStyle = {
  width: '100%',
  height: '100%',
  border: '0.05rem dashed gray',
  borderRadius: '0.2rem',
}

const defaultState = {
  files: [],
  errors: {},
  multiple: false,
  acceptableExtensions: DEFAULT_EXTENSIONS,
}

export default function useFileUpload({
  reducer = dragDropReducer,
  ...props
} = {}) {
  const {current: initialState} = useRef({...defaultState, ...props})
  const fileInput = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  const onDragEnterEvent = event => {
    if (event.dataTransfer?.items?.length) {
      dispatch({type: actionTypes.FILE_DRAGGED})
    }
  }

  const onDragLeaveEvent = _ => dispatch({type: actionTypes.FILE_DROPPED})

  const onDropEvent = event => {
    const {dataTransfer} = event
    if (dataTransfer?.items?.length) {
      dispatch({type: actionTypes.FILE_DROPPED})
      handleFiles(state, dispatch, dataTransfer.files)
      dataTransfer.clearData()
    }
  }

  const register = ref => (fileInput.current = ref)

  const onClickEvent = ({target}) =>
    fileAttrId !== target.dataset.id && fileInput.current.click()

  const getDragDropContainerProps = ({
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    customStyle = {},
    ...props
  }) => {
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
  }

  const getInputProps = ({
    onClick,
    onChange,
    customStyle = {},
    ...props
  } = {}) => {
    return {
      'data-id': fileAttrId,
      type: FILE,
      name: FILE,
      ...props,
      style: {
        ...customStyle,
      },
    }
  }
  return [state, register, getDragDropContainerProps, getInputProps]
}
