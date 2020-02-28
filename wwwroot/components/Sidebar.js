import dayjs from "/web_modules/dayjs.js"

import Button from "/components/Button.js"
import FileInput from "/components/FileInput.js"
import { connect, createStructuredSelector, html } from "/utils/h.js"
import { fileToStoredPhoto } from "/utils/file.js"
import { clearPhotosStorage, persistPhoto } from "/utils/storage.js"
import {
  appendPhotos,
  clearPhotos,
  photosSelector,
  pipe,
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
    clearPhotos: async () => {
      store.setState(setStorageLoading(true))
      await clearPhotosStorage()
      store.setState(pipe(clearPhotos, setStorageLoading(false)))
    },
  }),
)

function Sidebar({ addPhoto, clearPhotos, photos }) {
  return html`
    <${FileInput} droppable multiple onChange=${addPhoto} values=${photos}>
      ${({ draggedOver, openFileDialog }) =>
        html`
          <div className="bg-indigo-300 flex flex-col min-h-screen px-4 py-2">
            <div className="flex-1">
              ${photos.map(
                photo =>
                  html`
                    <div>
                      ${photo.filename} ${dayjs(photo.datetime).format("L")}
                    </div>
                  `,
              )}
            </div>
            <div>
              <${Button} indigo onClick=${openFileDialog}>
                Add images
              <//>
              <${Button} indigo onClick=${clearPhotos}>
                Clear
              <//>
            </div>
          </div>
        `}
    <//>
  `
}

export default withSidebar(Sidebar)
