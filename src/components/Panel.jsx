import dayjs from "dayjs"
import { h } from "preact"
import { createStructuredSelector } from "reselect"

import Button from "./Button"
import FileInput from "./FileInput"
import { connect } from "../utils/h.js"
import { fileToStoredPhoto } from "../utils/file.js"
import { persistPhoto } from "../utils/storage.js"
import {
  appendPhotos,
  photosSelector,
  setStorageLoading,
  storageLoadingSelector,
} from "../utils/store.js"

const withPanel = connect(
  createStructuredSelector({
    photos: photosSelector,
    storageLoading: storageLoadingSelector,
  }),
)

function Panel({ addPhoto, photos }) {
  return <div className="">HAHA</div>
}

export default withPanel(Panel)
