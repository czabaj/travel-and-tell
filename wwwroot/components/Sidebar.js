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

const withSidebar = connect(
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

function Sidebar({ addPhoto, photos }) {
  return html`
    <div className="bg-indigo-300 min-h-screen px-4 py-2">
      <${FileInput} droppable multiple onChange=${addPhoto} values=${photos}>
        ${({ draggedOver, openFileDialog }) =>
          html`
            <div>
              <${Button} indigo onClick=${openFileDialog}>
                Load images
              <//>
            </div>
            <div>
              ${photos.map(
                photo =>
                  html`
                    <div>
                      ${photo.filename} ${dayjs(photo.datetime).format("L")}
                    </div>
                  `,
              )}
            </div>
          `}
      <//>
    </div>
  `
}

export default withSidebar(Sidebar)
