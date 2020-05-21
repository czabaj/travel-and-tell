import "preact/debug"
import { compose, pipe } from "ramda"
// https://www.npmjs.com/package/unistore
import { Provider, createStore } from "unistore/full/preact.es.js"
import connectToDevTools from "unistore/devtools.js"

import { h, render } from "preact"

import Hotkeys from "./components/Hotkeys"
import Layout from "./components/Layout"
import Map from "./components/Map"
import Panel from "./components/Panel"
import Sidebar from "./components/Sidebar"
import { getStoredPhotos } from "./utils/storage"
import { appendPhotos, enhanceStore, setStorageLoading } from "./utils/store"

function App() {
  const initialState = pipe(appendPhotos([]), setStorageLoading(true))({})
  const store = compose(
    connectToDevTools,
    enhanceStore,
    createStore,
  )(initialState)

  getStoredPhotos().then(photos =>
    store.setState(pipe(appendPhotos(photos), setStorageLoading(false))),
  )

  return (
    <Provider store={store}>
      <Layout panel={<Panel />} sidebar={<Sidebar />}>
        <Hotkeys />
        <Map />
      </Layout>
    </Provider>
  )
}

// Inject your application into the an element with the id `app`.
render(<App />, document.getElementById("app"))
