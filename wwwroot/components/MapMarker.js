import { createPortal } from "/web_modules/preact/compat.js"
import * as R from "/web_modules/ramda.js"

import Image from "/components/Image.js"
import {
  Fragment,
  connect,
  createSelector,
  html,
  useEffect,
  useMemo,
} from "/utils/h.js"
import { focusedPhotoIdSelector } from "/utils/store.js"

const photosSelector = (_, { photos }) => photos

const withMarker = connect(
  createSelector(
    focusedPhotoIdSelector,
    photosSelector,
    (focusedPhotoId, photos) => ({
      focusedPhoto:
        focusedPhotoId && R.find(R.whereEq({ id: focusedPhotoId }), photos),
    }),
  ),
)

function Marker({ map, focusedPhoto }) {
  const content = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    if (focusedPhoto) {
      new mapboxgl.Popup()
        .setLngLat(R.reverse(focusedPhoto.gps))
        .setDOMContent(content)
        .addTo(map)
    }
  }, [focusedPhoto])

  return focusedPhoto
    ? createPortal(
        html`
          <${Fragment}>
            <${Image} blob=${focusedPhoto.blob} />
          <//>
        `,
        content,
      )
    : null
}

export default withMarker(Marker)
