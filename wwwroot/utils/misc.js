export function preventDefault(event) {
  event.preventDefault()
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
