import dayjs from "/web_modules/dayjs.js"
import { createStructuredSelector } from "/web_modules/reselect.js"

import Button from "/components/Button.js"
import FileInput from "/components/FileInput.js"
import { connect, html } from "/utils/h.js"
import { fileToStoredPhoto } from "/utils/file.js"
import { persistPhoto } from "/utils/storage.js"
import {
  appendPhotos,
  photosSelector,
  setStorageLoading,
  storageLoadingSelector,
} from "/utils/store.js"

const withPanel = connect(
  createStructuredSelector({
    photos: photosSelector,
    storageLoading: storageLoadingSelector,
  }),
  store => ({
    addPhoto: async (_, newFiles) => {
      // indicate store storage is loading
      store.setState(setStorageLoading(true))
      // transform File[] into StoredPhoto[]
      const storedPhotos = await Promise.all(newFiles.map(fileToStoredPhoto))
      // merge StoredPhoto[] `photos` in unistore
      store.setState(appendPhotos(storedPhotos))
      // persist all StoredPhoto in storage
      Promise.all(storedPhotos.map(persistPhoto)).finally(() =>
        // finally unset indicator
        store.setState(setStorageLoading(false)),
      )
    },
  }),
)

function Panel({ addPhoto, photos }) {
  return html`
    <div className="">
      HAHA
    </div>
  `
}

export default withPanel(Panel)
