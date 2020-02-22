import "/web_modules/preact/debug.js"
// https://www.npmjs.com/package/unistore
import { createStore } from "/web_modules/unistore/full/preact.es.js"
import unistoreDevTools from "/utils/unistore.devtools.js"

import { render } from "/web_modules/preact.js"
import { useState } from "/web_modules/preact/hooks.js"
import { Provider } from "/web_modules/unistore/full/preact.es.js"

import Button from "/components/Button.js"
import Content from "/components/Content.js"
import Layout from "/components/Layout.js"
import Map from "/components/Map.js"
import Sidebar from "/components/Sidebar.js"
import { html } from "/utils/h.js"

const store = createStore({ files: [] })
unistoreDevTools(store)

// Inject your application into the an element with the id `app`.
render(
  html`
    <${Provider} store=${store}>
      <${Layout}
        sidebar=${html`
          <${Sidebar} />
        `}
      >
        <${Map} />
      <//>
    <//>
  `,
  document.getElementById("app"),
)
