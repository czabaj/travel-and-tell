import { h } from "preact"
import { isEmpty, pipe } from "ramda"

import Button from "./Button"
import FileInput from "./FileInput"
import SidebarItem from "./SidebarItem"
import {
  connect,
  createStructuredSelector,
  useCallback,
  useReducer,
} from "../utils/h.js"
import { fileToStoredPhoto } from "../utils/file.js"
import { clearPhotosStorage, persistPhoto } from "../utils/storage.js"
import {
  appendPhotos,
  clearPhotos,
  photosByDateSelector,
  setFocusedPhotoId,
  setStorageLoading,
  storageLoadingSelector,
} from "../utils/store.js"

const withSidebar = connect(
  createStructuredSelector({
    photos: photosByDateSelector,
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
    focusPhoto: (
      state,
      {
        target: {
          dataset: { id },
        },
      },
    ) => setFocusedPhotoId(id, state),
  }),
)

function selectionReduced(selection, event) {
  switch (event.type) {
    case "change": {
      const {
        target: {
          dataset: { id },
        },
      } = event
      const { [id]: selected, ...other } = selection
      return selected ? other : { ...other, [id]: true }
    }
    case "selectAll":
      return event.photos.reduce((acc, { id }) => ((acc[id] = true), acc), {})
    case "deselectAll":
      return {}
    default:
      throw new Error(`Unsupported event type: '${event.type}'`)
  }
}

function Sidebar({ addPhoto, clearPhotos, focusPhoto, photos }) {
  const [selection, dispatchSelect] = useReducer(selectionReduced, {})
  const allSelected =
    !isEmpty(photos) && photos.every(({ id }) => selection[id])
  const toggleSelectAll = useCallback(
    () =>
      dispatchSelect(
        allSelected ? { type: "deselectAll" } : { type: "selectAll", photos },
      ),
    [allSelected, photos],
  )

  return (
    <FileInput droppable multiple onChange={addPhoto} values={photos}>
      {({ draggedOver, openFileDialog }) => (
        <div className="bg-indigo-300 flex flex-col min-h-screen">
          <div className="flex items-center jus px-3 py-2 space-x-3">
            <input
              name="photos_all"
              onChange={toggleSelectAll}
              type="checkbox"
              checked={allSelected}
            />

            <Button indigo onClick={openFileDialog}>
              Add images
            </Button>
            <Button disabled={isEmpty(selection)} indigo onClick={clearPhotos}>
              Clear
            </Button>
          </div>

          <div className="flex-1">
            {photos.map(photo => (
              <SidebarItem
                dispatchSelect={dispatchSelect}
                focusPhoto={focusPhoto}
                photo={photo}
                selection={selection}
              />
            ))}
          </div>
        </div>
      )}
    </FileInput>
  )
}

export default withSidebar(Sidebar)
