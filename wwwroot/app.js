import { render } from "/web_modules/preact.js"

import { html } from "/utils/h.js"
import Button from "/components/Button.js"

// Create your main app component
function SomePreactComponent() {
  return html`
    <h1 className="text-4xl font-bold text-center text-blue-500">
      Hello, World!
    </h1>
  `
}

// Inject your application into the an element with the id `app`.
render(
  html`
    <${SomePreactComponent} />
    <${Button} to="#">Button example<//>
  `,
  document.getElementById("app"),
)
