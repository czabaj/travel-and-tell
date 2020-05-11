import "preact/debug"
import { pipe } from "ramda"
// https://www.npmjs.com/package/unistore
import { Provider, createStore } from "unistore/full/preact.es.js"
import unistoreDevTools from "./utils/unistore.devtools.js"

import { h, render } from "preact"

import Layout from "./components/Layout.jsx"
import Map from "./components/Map.jsx"
import Panel from "./components/Panel.jsx"
import Sidebar from "./components/Sidebar.jsx"
import { getStoredPhotos } from "./utils/storage.js"
import { appendPhotos, enhanceStore, setStorageLoading } from "./utils/store.js"

function App() {
  const initialState = pipe(appendPhotos([]), setStorageLoading(true))({})
  const store = enhanceStore(createStore(initialState))
  unistoreDevTools(store)

  getStoredPhotos().then(photos =>
    store.setState(pipe(appendPhotos(photos), setStorageLoading(false))),
  )

  return (
    <Provider store={store}>
      <Layout panel={<Panel />} sidebar={<Sidebar />}>
        <Map />
      </Layout>
    </Provider>
  )
}

// Inject your application into the an element with the id `app`.
render(<App />, document.getElementById("app"))
