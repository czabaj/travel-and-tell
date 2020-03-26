import { createContext } from "/web_modules/preact/compat.js"

export const accessToken = `pk.eyJ1IjoiZ3JvaGxpbmdyIiwiYSI6ImNrNndkemcwbjBhcTQzZXA3dXF1NHhzd20ifQ.F-h79-Hy4L81orYqieRyNA`

export const createMap = node => {
  mapboxgl.accessToken = accessToken
  return new mapboxgl.Map({
    container: node,
    style: "mapbox://styles/mapbox/streets-v11",
  })
}

export const mapContext = createContext(null)
