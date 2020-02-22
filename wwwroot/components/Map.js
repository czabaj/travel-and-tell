import { connect, html, useEffect } from "/utils/h.js"

const accessToken = `pk.eyJ1IjoiZ3JvaGxpbmdyIiwiYSI6ImNrNndkemcwbjBhcTQzZXA3dXF1NHhzd20ifQ.F-h79-Hy4L81orYqieRyNA`

function Map({ files, to, gray, indigo, ...other }) {
  console.log("files", files)

  useEffect(() => {
    const mymap = L.map("mapid").setView([51.505, -0.09], 13)

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
    ).addTo(mymap)

    const marker = L.marker([51.5, -0.09]).addTo(mymap)

    var circle = L.circle([51.508, -0.11], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(mymap)

    var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047],
    ]).addTo(mymap)

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup()
    circle.bindPopup("I am a circle.")
    polygon.bindPopup("I am a polygon.")

    var popup = L.popup()
      .setLatLng([51.5, -0.09])
      .setContent("I am a standalone popup.")
      .openOn(mymap)
  }, [])

  return html`
    <div className="min-h-screen" id="mapid" />
  `
}

export default connect("files")(Map)
