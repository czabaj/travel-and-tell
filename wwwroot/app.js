import "/web_modules/preact/debug.js"
// https://www.npmjs.com/package/unistore
import { createStore } from "/web_modules/unistore/full/preact.es.js"
import * as R from "/web_modules/ramda.js"
import unistoreDevTools from "/utils/unistore.devtools.js"

import { render } from "/web_modules/preact.js"
import { Provider } from "/web_modules/unistore/full/preact.es.js"

import Button from "/components/Button.js"
import Content from "/components/Content.js"
import Layout from "/components/Layout.js"
import Map from "/components/Map.js"
import Panel from "/components/Panel.js"
import Sidebar from "/components/Sidebar.js"
import { html } from "/utils/h.js"
import { getStoredPhotos } from "/utils/storage.js"
import {
  appendPhotos,
  enhanceStore,
  pipe,
  setStorageLoading,
} from "/utils/store.js"

function App() {
  const initialState = pipe(appendPhotos([]), setStorageLoading(true))({})
  const store = enhanceStore(createStore(initialState))
  unistoreDevTools(store)

  getStoredPhotos().then(photos =>
    store.setState(pipe(appendPhotos(photos), setStorageLoading(false))),
  )

  return html`
    <${Provider} store=${store}>
      <${Layout}
        panel=${html`
          <${Panel} />
        `}
        sidebar=${html`
          <${Sidebar} />
        `}
      >
        <${Map} />
      <//>
    <//>
  `
}

// Inject your application into the an element with the id `app`.
render(
  html`
    <${App} />
  `,
  document.getElementById("app"),
)
