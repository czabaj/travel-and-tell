import "/web_modules/preact/debug.js"
import { render } from "/web_modules/preact.js"
import { useState } from "/web_modules/preact/hooks.js"
import { Provider } from "/web_modules/unistore/full/preact.es.js"

import Button from "/components/Button.js"
import Layout from "/components/Layout.js"
import store from "/store/index.js"
import { html } from "/utils/h.js"

// Create your main app component
function SomePreactComponent() {
  const [value, setValue] = useState(0)

  return html`
    <h1 className="text-4xl font-bold text-center text-blue-500">
      <div>Counter: ${value}</div>
      <button onClick=${() => setValue(value + 1)}>Increment</button>
      <button onClick=${() => setValue(value - 1)}>Decrement</button>
    </h1>
  `
}

// Inject your application into the an element with the id `app`.
render(
  html`
    <${Provider} store=${store}>
      <${Layout} sidebar=${"FOO"}>
        <${SomePreactComponent} />
        <${Button} indigo to="#">Button example<//>
      <//>
    <//>
  `,
  document.getElementById("app"),
)
