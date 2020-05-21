import * as R from "ramda"

mapboxgl.accessToken = `pk.eyJ1IjoiZ3JvaGxpbmdyIiwiYSI6ImNrNndkemcwbjBhcTQzZXA3dXF1NHhzd20ifQ.F-h79-Hy4L81orYqieRyNA`

export const createMap = node =>
  // all options https://docs.mapbox.com/mapbox-gl-js/api/#map
  new mapboxgl.Map({
    container: node,
    style: "mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g",
  })

/**
 * @see https://docs.mapbox.com/mapbox-gl-js/example/hillshade/
 */
export const addHillshading = map => {
  map.addSource("dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.terrain-rgb",
  })
  map.addLayer(
    {
      id: "hillshading",
      source: "dem",
      type: "hillshade",
      // insert below waterway-river-canal-shadow;
      // where hillshading sits in the Mapbox Outdoors style
    },
    "waterway-river-canal-shadow",
  )
}

const maxMin = R.apply(R.juxt([Math.max, Math.min]))
const ZOOM_OUT_DEGREE = 1
/**
 * Given photos object, returns mapbox CameraOptions
 * @param {import("/utils/storage.js").StoredPhoto[]} photos
 * @returns {mapboxgl.CameraOptions}
 * @see https://docs.mapbox.com/mapbox-gl-js/api/#cameraoptions
 */
export const mapCenterFromPhotos = R.pipe(
  R.applySpec({
    latitudes: R.map(R.path(["coordinates", 1])),
    longtitudes: R.map(R.path(["coordinates", 0])),
  }),
  ({ latitudes, longtitudes }) => {
    const latMaxMin = maxMin(latitudes)
    const longMaxMin = maxMin(longtitudes)
    const distances = R.map(R.compose(Math.abs, R.apply(R.subtract)), [
      latMaxMin,
      longMaxMin,
    ])
    const maxDistance = Math.max(...distances)

    return {
      center: R.map(R.mean, [longMaxMin, latMaxMin]),
      zoom: -Math.log2((maxDistance + ZOOM_OUT_DEGREE) / 360),
    }
  },
)
