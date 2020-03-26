import * as R from "/web_modules/ramda.js"
import {
  connect,
  createSelector,
  createStructuredSelector,
  html,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "/utils/h.js"
import { createMap } from "/utils/map.js"
import { photosByDateSelector, setFocusedPhotoId } from "/utils/store.js"
import MapMarker from "./MapMarker.js"

const PHOTOS = "photos"

const withMap = connect(
  createSelector(photosByDateSelector, photos => ({
    geoJsonData: {
      type: "FeatureCollection",
      features: R.map(
        ({ id, gps }) => ({
          type: "Feature",
          properties: { id, icon: "music" },
          geometry: { type: "Point", coordinates: R.reverse(gps) },
        }),
        photos,
      ),
    },
    photos,
  })),
  {
    clearFocusedPhoto: setFocusedPhotoId(null),
    setFocusedPhotoIdAction: R.flip(setFocusedPhotoId),
  },
)

function Map({
  clearFocusedPhoto,
  geoJsonData,
  photos,
  setFocusedPhotoIdAction,
}) {
  const mapRef = useRef()
  const [mapLoaded, setMapLoaded] = useState(false)

  const initMap = useCallback(node => {
    const map = createMap(node)
    mapRef.current = map

    map.on("load", () => {
      // nust trigger resize otherwise map canvas don't expand
      map.resize()

      map.addSource(PHOTOS, { type: "geojson", data: geoJsonData })
      map.addLayer({
        id: PHOTOS,
        type: "symbol",
        source: PHOTOS,
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true,
        },
      })

      map.on("click", PHOTOS, e => {
        var coordinates = e.features[0].geometry.coordinates.slice()

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        setFocusedPhotoIdAction(e.features[0].properties.id)
      })
      map.on("popupclose", clearFocusedPhoto)

      setMapLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (mapLoaded) {
      mapRef.current.getSource(PHOTOS).setData(geoJsonData)
    }
  }, [geoJsonData, mapLoaded])

  return html`
    <div className="absolute inset-0" ref=${initMap}>
      ${mapLoaded &&
        html`
          <${MapMarker} map=${mapRef.current} photos=${photos} />
        `}
    </div>
  `
}

export default withMap(Map)
