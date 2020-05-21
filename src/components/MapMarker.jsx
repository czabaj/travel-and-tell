import * as R from "ramda"

import Image from "./Image"
import {
  Fragment,
  createPortal,
  connect,
  createSelector,
  h,
  useEffect,
  useMemo,
} from "../utils/h.js"
import { focusedPhotoIdSelector, setFocusedPhotoId } from "../utils/store"

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
  {
    clearFocusedPhoto: setFocusedPhotoId(null),
  },
)

function Marker({ clearFocusedPhoto, map, focusedPhoto }) {
  const content = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    if (focusedPhoto) {
      new mapboxgl.Popup()
        .setLngLat(focusedPhoto.coordinates)
        .setDOMContent(content)
        .addTo(map)
        .on("close", clearFocusedPhoto)
    }
  }, [clearFocusedPhoto, content, focusedPhoto, map])

  return focusedPhoto
    ? createPortal(
        <Fragment>
          <Image blob={focusedPhoto.blob} />
        </Fragment>,
        content,
      )
    : null
}

export default withMarker(Marker)
