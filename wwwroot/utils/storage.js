// http://localforage.github.io/localForage/#data-api-clear

const config = localforage.config({
  description: "stores data for photos",
  driver: localforage.INDEXEDDB,
  name: "travel-and-tell",
  storeName: "stored_photos",
  version: 1.0,
})

/**
 *  Shape of StoredPhoto
 *  @version 1.0.0
 *  @typedef {
 *    blob: Blob,
 *    datetime: string,
 *    filename: string,
 *    gps: [number, number],
 *    id: string
 *  } StoredPhoto
 */

/**
 * @param {StoredPhoto} storedPhoto
 * @returns {Promise<void>}
 */
export const persistPhoto = storedPhoto =>
  config.then(() => localforage.setItem(storedPhoto.id, storedPhoto))

/**
 * @returns {Promise<StoredPhoto[]>}
 */
export const getStoredPhotos = () =>
  config.then(() => {
    const buffer = []
    return localforage.iterate(data => buffer.push(data)).then(() => buffer)
  })

/**
 * @param {StoredPhoto} storedPhoto
 * @returns {Promise<void>}
 */
export const removePhoto = ({ id }) =>
  config.then(() => localforage.removeItem(id))

/**
 * @returns {Promise<void>}
 */
export const clear = () => config.then(() => localforage.clear())
