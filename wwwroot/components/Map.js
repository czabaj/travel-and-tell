import { createContext, createPortal } from "/web_modules/preact/compat.js"
import * as R from "/web_modules/ramda.js"
import {
  Fragment,
  connect,
  html,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "/utils/h.js"

const accessToken = `pk.eyJ1IjoiZ3JvaGxpbmdyIiwiYSI6ImNrNndkemcwbjBhcTQzZXA3dXF1NHhzd20ifQ.F-h79-Hy4L81orYqieRyNA`

const mapContext = createContext(null)

function Marker({ file: { image, gps, filename } }) {
  const map = useContext(mapContext)
  const popup = useMemo(() => {
    const marker = L.marker(gps).addTo(map)
    const content = document.createElement("div")
    const popup = marker.bindPopup(content)
    return content
  })

  return createPortal(
    html`
      <${Fragment}>
        <b>${filename}</b>
      <//>
    `,
    popup,
  )
}

function Map({ files }) {
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
  }, [])

  useEffect(() => {
    if (!R.isEmpty(files)) mapRef.current.setView(R.head(files).gps, 13)
  }, [files])

  return html`
    <${mapContext.Provider} value=${mapRef.current}>
      <div className="min-h-screen" ref=${initMap}>
        ${files.map(
          file =>
            html`
              <${Marker} file=${file} />
            `,
        )}
      </div>
    <//>
  `
}

export default connect("files")(Map)
