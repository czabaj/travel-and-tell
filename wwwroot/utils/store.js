import * as R from "/web_modules/ramda.js"
import { isFunction } from "/web_modules/ramda-adjunct.js"

export { pipe } from "/web_modules/ramda.js"
import { createSelector } from "/web_modules/reselect.js"

/**
 * Enhances unistore store that:
 * - function `setState()` accepts state updater function as first argument
 * @param {*} originalStore
 */
export const enhanceStore = originalStore => ({
  ...originalStore,
  setState: (update, overwrite, action) =>
    originalStore.setState(
      isFunction(update) ? update(originalStore.getState()) : update,
      overwrite,
      action,
    ),
})

// lenses
const photos = R.lensProp("photos")
const storageLoading = R.lensProp("storageLoading")
const focusedPhotoId = R.lensProp("focusedPhoto")

// selectors
export const focusedPhotoIdSelector = R.view(focusedPhotoId)
export const photosSelector = R.view(photos)
export const focusedPhotoSelector = createSelector(
  focusedPhotoIdSelector,
  photosSelector,
  (focusedPhotoId, photos) =>
    focusedPhotoId && photos.find(({ id }) => id === focusedPhotoId),
)
export const photosByDateSelector = createSelector(
  photosSelector,
  R.sortBy(R.prop("datetime")),
)
export const storageLoadingSelector = R.view(storageLoading)

// updaters
export const appendPhotos = R.curry((newPhotos, state) =>
  R.over(photos, R.unionWith(R.eqBy(R.prop("id")), newPhotos), state),
)
export const setFocusedPhotoId = R.curry((photoId, state) =>
  R.set(focusedPhotoId, photoId || undefined, state),
)
export const setFocusedPhotoComment = R.curry((comment, state) => {
  const focusedPhotoIndex = R.pipe(
    R.juxt([focusedPhotoIdSelector, photosSelector]),
    ([id, photos]) => R.findIndex(R.whereEq({ id }), photos),
  )(state)
  return R.over(
    R.compose(R.photos, R.lensIndex(focusedPhotoIndex)),
    R.set("comment", comment),
    state,
  )
})
export const setStorageLoading = R.curry((loadingState, state) =>
  R.set(storageLoading, Boolean(loadingState), state),
)
export const clearPhotos = R.set(photos, [])
