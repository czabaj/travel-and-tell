import { h } from "preact"
import * as R from "ramda"

import Image from "./Image"
import {
  createPortal,
  connect,
  createSelector,
  useEffect,
  useMemo,
} from "../utils/h.js"
import { focusedPhotoIdSelector } from "../utils/store.js"

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
        .setLngLat(focusedPhoto.coordinates)
        .setDOMContent(content)
        .addTo(map)
    }
  }, [content, focusedPhoto, map])

  return focusedPhoto
    ? createPortal(
        <>
          <Image blob={focusedPhoto.blob} />
        </>,
        content,
      )
    : null
}

export default withMarker(Marker)
