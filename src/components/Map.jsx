import { h } from "preact"
import * as R from "ramda"

import {
  connect,
  createSelector,
  useCallback,
  useState,
  useEffect,
} from "../utils/h.js"
import { addHillshading, createMap, mapCenterFromPhotos } from "../utils/map.js"
import { photosByDateSelector, setFocusedPhotoId } from "../utils/store.js"
import MapMarker from "./MapMarker.jsx"

const LAYER_PHOTOS_LINE = "layerPhotosLine"
const LAYER_PHOTOS_POINTS = "layerPhotosPoints"

const withMap = connect(
  createSelector(photosByDateSelector, photos => ({
    geoJsonLine: {
      type: "FeatureCollection",
      features: [
        {
          geometry: {
            type: "LineString",
            coordinates: R.map(R.prop("coordinates"), photos),
          },
          type: "Feature",
        },
      ],
    },
    geoJsonPoints: {
      type: "FeatureCollection",
      features: R.map(
        ({ icon, id, coordinates }) => ({
          geometry: { type: "Point", coordinates },
          properties: { icon: icon || "marker", id },
          type: "Feature",
        }),
        photos,
      ),
    },
    mapCenter: !R.isEmpty(photos) && mapCenterFromPhotos(photos),
    photos,
  })),
  {
    setFocusedPhoto: R.flip(setFocusedPhotoId),
  },
)

function Map({
  clearFocusedPhoto,
  geoJsonLine,
  geoJsonPoints,
  mapCenter,
  photos,
  setFocusedPhoto,
}) {
  const [map, setMap] = useState(null)

  const initMap = useCallback(node => {
    const mapInstance = createMap(node)
    mapInstance.on("load", () => {
      // nust trigger resize otherwise map canvas don't expand
      mapInstance.resize()

      addHillshading(mapInstance)

      mapInstance.addSource(LAYER_PHOTOS_LINE, {
        type: "geojson",
        data: geoJsonLine,
      })
      mapInstance.addLayer({
        id: LAYER_PHOTOS_LINE,
        type: "line",
        source: LAYER_PHOTOS_LINE,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#ed6498",
          "line-width": 5,
          "line-opacity": 0.8,
        },
      })

      mapInstance.addSource(LAYER_PHOTOS_POINTS, {
        type: "geojson",
        data: geoJsonPoints,
      })
      mapInstance.addLayer({
        id: LAYER_PHOTOS_POINTS,
        type: "symbol",
        source: LAYER_PHOTOS_POINTS,
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
      const openPopup = e => {
        setFocusedPhoto(e.features[0].properties.id)
      }
      map.on("click", LAYER_PHOTOS_POINTS, openPopup)
      return () => {
        map.off("click", LAYER_PHOTOS_POINTS, openPopup)
      }
    }
  }, [clearFocusedPhoto, map, setFocusedPhoto])

  useEffect(() => {
    if (map) {
      map.getSource(LAYER_PHOTOS_LINE).setData(geoJsonLine)
      map.getSource(LAYER_PHOTOS_POINTS).setData(geoJsonPoints)
    }
  }, [geoJsonLine, geoJsonPoints, map])

  useEffect(() => {
    if (map && mapCenter) {
      map.jumpTo(mapCenter)
    }
  }, [map, mapCenter])

  return (
    <div className="absolute inset-0" ref={initMap}>
      {map && <MapMarker map={map} photos={photos} />}
    </div>
  )
}

export default withMap(Map)
