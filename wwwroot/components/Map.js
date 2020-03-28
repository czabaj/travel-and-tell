import * as R from "/web_modules/ramda.js"
import {
  connect,
  createSelector,
  html,
  useCallback,
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
  const [map, setMap] = useState(null)

  const initMap = useCallback(node => {
    const mapInstance = createMap(node)
    mapInstance.on("load", () => {
      // nust trigger resize otherwise map canvas don't expand
      mapInstance.resize()

      mapInstance.addSource(PHOTOS, { type: "geojson", data: geoJsonData })
      mapInstance.addLayer({
        id: PHOTOS,
        type: "symbol",
        source: PHOTOS,
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true,
        },
      })

      setMap(mapInstance)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (map) {
      map.on("popupclose", clearFocusedPhoto)
      return () => map.off("popupclose", clearFocusedPhoto)
    }
  }, [clearFocusedPhoto, map])

  useEffect(() => {
    if (map) {
      const openPopup = e => {
        var coordinates = e.features[0].geometry.coordinates.slice()

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        setFocusedPhotoIdAction(e.features[0].properties.id)
      }
      map.on("click", PHOTOS, openPopup)
      return () => map.off("click", PHOTOS, openPopup)
    }
  }, [map, setFocusedPhotoIdAction])

  useEffect(() => {
    if (map) {
      map.getSource(PHOTOS).setData(geoJsonData)
    }
  }, [geoJsonData, map])

  return html`
    <div className="absolute inset-0" ref=${initMap}>
      ${map &&
        html`
          <${MapMarker} map=${map} photos=${photos} />
        `}
    </div>
  `
}

export default withMap(Map)
