import {useReducer, useRef} from 'react'

const callfn = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

export const DEFAULT_EXTENSIONS = ['jpeg', 'jpg']

export const actionTypes = {
  FILE_DRAGGED: 'FILE_DRAGGED',
  FILE_DROPPED: 'FILE_DROPPED',
  ADD_FILES: 'ADD_FILES',
}

const preventNavigation = event => {
  event.preventDefault()
  event.stopPropagation()
}

const dragDropReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FILE_DRAGGED:
      return {
        ...state,
        drag: true,
      }
    case actionTypes.FILE_DROPPED:
      return {
        ...state,
        drag: false,
      }
    case actionTypes.ADD_FILES:
      return {
        ...state,
        files: [...state.files, ...action.payload],
      }
    default:
      return {
        drag: false,
      }
  }
}

const isValidFiles = (state, dispatch, newFiles, props) => {
  // pending validation here
  if (props?.customValidation) {
    return props.customValidation(state.files, newFiles)
  }
  return newFiles
}

const handleFiles = (state, dispatch, newFiles, props) => {
  const validFiles = isValidFiles(state, dispatch, newFiles, props)
  if (validFiles.length) {
    dispatch({type: actionTypes.ADD_FILES, payload: validFiles})
  }
}

export const defaultStyle = {
  width: '200px',
  height: '200px',
  border: '0.05rem dashed gray',
  borderRadius: '0.2rem',
}

const defaultState = {
  files: [],
  errors: {},
  multiple: false,
  acceptableExtensions: DEFAULT_EXTENSIONS,
}

export const useFileUpload = ({reducer = dragDropReducer, ...props} = {}) => {
  const {current: initialState} = useRef({...defaultState, ...props})
  const [state, dispatch] = useReducer(reducer, initialState)

  const onDragEnterEvent = event => {
    if (event.dataTransfer?.items?.length) {
      dispatch({type: actionTypes.FILE_DRAGGED})
    }
  }

  const onDragLeaveEvent = _ => dispatch({type: actionTypes.FILE_DROPPED})

  const onDropEvent = event => {
    const {dataTransfer} = event
    dispatch({type: actionTypes.FILE_DROPPED})
    if (dataTransfer?.items?.length) {
      handleFiles(state, dispatch, dataTransfer.files, props)
      dataTransfer.clearData()
    }
  }
  const getDragDropContainerProps = ({
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    customStyle,
    ...props
  }) => {
    return {
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
  return [state, getDragDropContainerProps]
}
