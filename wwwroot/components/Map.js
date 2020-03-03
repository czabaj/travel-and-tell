import * as R from "/web_modules/ramda.js"
import {
  connect,
  createStructuredSelector,
  html,
  useCallback,
  useEffect,
  useRef,
} from "/utils/h.js"
import { accessToken, mapContext } from "/utils/map.js"
import { photosSelector, setFocusedPhoto } from "/utils/store.js"
import MapMarker from "./MapMarker.js"

const withMap = connect(createStructuredSelector({ photos: photosSelector }), {
  clearFocusedPhoto: setFocusedPhoto(null),
})

function Map({ clearFocusedPhoto, photos }) {
  const mapRef = useRef()

  const initMap = useCallback(node => {
    const map = (mapRef.current = L.map(node))
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken,
      },
    ).addTo(map)

    map.setView([0, 0], 3)

    map.on("popupclose", clearFocusedPhoto)
  }, [])

  useEffect(() => {
    if (!R.isEmpty(photos)) mapRef.current.setView(R.head(photos).gps, 13)
  }, [photos])

  return html`
    <${mapContext.Provider} value=${mapRef.current}>
      <div className="min-h-screen" ref=${initMap}>
        ${photos.map(
          photo =>
            html`
              <${MapMarker} key=${photo.id} photo=${photo} />
            `,
        )}
      </div>
    <//>
  `
}

export default withMap(Map)
