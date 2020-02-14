import { render } from "/web_modules/preact.js"

import { html } from "/src/h.js"

// Create your main app component
function SomePreactComponent() {
  return html`
    <h1 className="text-red-500">Hello, World!</h1>
  `
}

// Inject your application into the an element with the id `app`.
render(
  html`
    <${SomePreactComponent} />
  `,
  document.getElementById("app"),
)
