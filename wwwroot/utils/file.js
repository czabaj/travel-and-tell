import dayjs from "/web_modules/dayjs.js"

/**
 * Converts File object containing image into Storage object.
 * @param {File} file
 * @returns Promise<StoredImage>
 */
export function fileToStoredPhoto(file) {
  return new Promise((resolve, reject) => {
    const loadingImg = loadImage(
      file,
      (result, meta) => {
        if (result.type === "error") {
          reject(result)
        } else {
          result.toBlob(blob => {
            const filename = file.name
            const exif = meta.exif.getAll()
            const datetime = dayjs(
              exif.DateTimeOriginal,
              "YYYY:MM:DD HH:mm:ss",
            ).toISOString()
            const gps = getExifGPS(exif)

            resolve({
              blob,
              datetime,
              filename,
              gps,
              id: `${filename}_${datetime}_${gps}`,
            })
          })
        }
      },
      { canvas: true, maxWidth: 600, meta: true },
    )
    loadingImg.onerror = reject
  })
}

// export function imgToCanvas(img) {
//   const imgCanvas = document.createElement("canvas")
//   const imgContext = imgCanvas.getContext("2d")

//   // Make sure canvas is as big as the picture
//   imgCanvas.width = img.width
//   imgCanvas.height = img.height

//   // Draw image into canvas element
//   imgContext.drawImage(img, 0, 0, img.width, img.height)

//   return imgCanvas
// }

/**
 * Given dataUrl returns Image object
 * @param {string} dataUrl
 * @returns Image
 */
export function dataUrlToImage(dataUrl) {
  const imgUrl = urlCreator.createObjectURL(dataUrl)
  const img = new Image()
  img.src = imgUrl
  URL.revokeObjectURL(imgURL)
  return img
}

function getExifGPS({
  GPSLatitude,
  GPSLatitudeRef,
  GPSLongitude,
  GPSLongitudeRef,
}) {
  return GPSLatitude && GPSLatitudeRef && GPSLongitude && GPSLongitudeRef
    ? [
        { coordinate: GPSLatitude, hemisphere: GPSLatitudeRef },
        { coordinate: GPSLongitude, hemisphere: GPSLongitudeRef },
      ].map(({ coordinate, hemisphere }) => {
        const [degrees, minutes, seconds] = coordinate
          .split(",", 3)
          .map(parseFloat)
        const sign = hemisphere == "W" || hemisphere == "S" ? -1 : 1
        return sign * (degrees + minutes / 60 + seconds / 3600)
      })
    : undefined
}

/**
 * @typedef StoredImage
 * @type { blob: Blob, datetime: string, filename: string, gps: [number, number], id: string }
 */
