import * as R from "/web_modules/ramda.js"

const accessToken = `pk.eyJ1IjoiZ3JvaGxpbmdyIiwiYSI6ImNrNndkemcwbjBhcTQzZXA3dXF1NHhzd20ifQ.F-h79-Hy4L81orYqieRyNA`

export const createMap = node => {
  mapboxgl.accessToken = accessToken
  return new mapboxgl.Map({
    container: node,
    style: "mapbox://styles/mapbox/streets-v11",
  })
}

const maxMin = R.apply(R.juxt([Math.max, Math.min]))
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
      zoom: -Math.log2((maxDistance + 0.7) / 360),
    }
  },
)
