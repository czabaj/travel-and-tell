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
)

function Panel({ addPhoto, photos }) {
  return html`
    <div className="">
      HAHA
    </div>
  `
}

export default withPanel(Panel)
