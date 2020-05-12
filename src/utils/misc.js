export function preventDefault(event) {
  event.preventDefault()
  return event
}

export function clickOn(domNode) {
  domNode.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  )
}
