import * as R from "/web_modules/ramda.js"
import {
  html,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "/utils/h.js"
import { clickOn, preventDefault } from "/utils/misc.js"

const createFileInput = (accept, multiple, onChange) => {
  const input = document.createElement("input")
  input.accept = accept
  input.multiple = multiple
  input.onchange = event => onChange(Array.from(event.target.files))
  input.type = "file"
  return input
}

function FileInput({
  accept,
  children,
  disabled,
  droppable,
  multiple,
  onChange,
  readOnly,
  value,
}) {
  useEffect(() => {
    if (droppable) {
      // prevent loading documents accidentally dropped outside dropzone
      window.addEventListener("dragover", preventDefault)
      window.addEventListener("drop", preventDefault)
      return () => {
        window.removeEventListener("dragover", preventDefault)
        window.removeEventListener("drop", preventDefault)
      }
    }
  }, [droppable])

  const [hiddenInput, setHiddenInput] = useState(() =>
    createFileInput(accept, multiple, onChange),
  )

  const previousValue = useRef(value)
  useEffect(() => {
    if (multiple && R.length(previousValue.current) > R.length(value)) {
      setHiddenInput(createFileInput(accept, multiple, onChange))
    }
    previousValue.current = value
  }, [accept, multiple, onChange, value])

  const openFileDialog = useCallback(() => {
    if (!disabled && !readOnly) clickOn(hiddenInput)
  }, [disabled, readOnly])

  const [draggedOver, handleDragEvents] = useReducer(({ type }) => {
    switch (type) {
      case "dragenter":
        return true
      case "dragleave":
        return false
      case "dragover":
        return true
      case "drop":
        if (e.dataTransfer.files) {
          onChange(Array.from(e.dataTransfer.files))
        }
        return false
    }
  }, false)

  const content = children({ draggedOver, openFileDialog, value })

  return droppable && !disabled && !readOnly
    ? html`
        <div
          onDragEnter=${handleDragEvents}
          onDragLeave=${handleDragEvents}
          onDragOver=${handleDragEvents}
          onDrop=${handleDragEvents}
        >
          ${content}
        </div>
      `
    : content
}

export default FileInput
