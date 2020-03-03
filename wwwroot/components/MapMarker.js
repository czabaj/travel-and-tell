import { createPortal, useReducer } from "/web_modules/preact/compat.js"

import Image from "/components/Image.js"
import {
  Fragment,
  connect,
  createSelector,
  html,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "/utils/h.js"
import { mapContext } from "/utils/map.js"
import { focusedPhotoSelector } from "/utils/store.js"

const photoIdSelector = (_, { photo: { id } }) => id

const withMarker = connect(
  createSelector(
    focusedPhotoSelector,
    photoIdSelector,
    (focusedPhoto, photoId) => ({ focused: focusedPhoto === photoId }),
  ),
)

function Marker({ focused, photo: { blob, gps } }) {
  const map = useContext(mapContext)
  const content = useMemo(() => document.createElement("div"), [])
  const popupRef = useRef()
  useEffect(() => {
    const marker = L.marker(gps).addTo(map)
    popupRef.current = marker.bindPopup(content)
    return () => {
      marker.remove()
    }
  }, [])
  useEffect(() => {
    if (focused) popupRef.current.openPopup()
  }, [focused])

  return createPortal(
    html`
      <${Fragment}>
        <${Image} blob=${blob} />
      <//>
    `,
    content,
  )
}

export default withMarker(Marker)
