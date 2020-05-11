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
 *  @version 2.0.1
 *  @see SchemaVer https://github.com/snowplow/iglu/wiki/SchemaVer
 *  @typedef {object} StoredPhoto
 *  @property {Blob} blob with image data
 *  @property {[number, number]} GPS coordinates as [longtitude, latitude]
 *  @property {string} datetime of capture as ISO-8601 simplified extended (YYYY-MM-DDTHH:mm:ss.sssZ)
 *  @property {string} filename of source file
 *  @property {string} icon name from Maki icon set @see https://labs.mapbox.com/maki-icons/
 *  @property {string} id
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
    return localforage
      .iterate(data => {
        buffer.push(data)
      })
      .then(() => buffer)
  })

/**
 * @param {StoredPhoto} storedPhoto
 * @returns {Promise<void>}
 */
export const removeStoredPhoto = ({ id }) =>
  config.then(() => localforage.removeItem(id))

/**
 * @returns {Promise<void>}
 */
export const clearPhotosStorage = () => config.then(() => localforage.clear())
