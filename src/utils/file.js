import dayjs from "dayjs"

/**
 * Converts File object containing image into Storage object.
 * @param {File} file
 * @returns Promise<StoredPhoto>
 */
export function fileToStoredPhoto(file) {
  return new Promise((resolve, reject) => {
    const loadingImg = loadImage(
      file,
      (result, meta) => {
        if (result.type === `error`) {
          reject(result)
        } else {
          result.toBlob(blob => {
            const filename = file.name
            const exif = meta.exif.getAll()
            const datetime = dayjs(
              exif.DateTimeOriginal,
              `YYYY:MM:DD HH:mm:ss`,
            ).toISOString()
            const coordinates = getCoordinatesFromExif(exif)

            resolve({
              blob,
              comment: ``,
              coordinates,
              datetime,
              filename,
              id: `${filename}_${datetime}_${coordinates}`,
            })
          })
        }
      },
      { canvas: true, maxWidth: 600, meta: true },
    )
    loadingImg.onerror = reject
  })
}

/**
 * Given exif data, outputs coordinates as tuple [longitude, latitude] which
 * comply with GeoJSON Position
 * @see GeoJSON position https://tools.ietf.org/html/rfc7946#section-3.1.1
 * @param {object} exifData
 * @returns {[number, number] | undefined}
 */
function getCoordinatesFromExif({
  GPSLatitude,
  GPSLatitudeRef,
  GPSLongitude,
  GPSLongitudeRef,
}) {
  return GPSLatitude && GPSLatitudeRef && GPSLongitude && GPSLongitudeRef
    ? [
        { coordinate: GPSLongitude, hemisphere: GPSLongitudeRef },
        { coordinate: GPSLatitude, hemisphere: GPSLatitudeRef },
      ].map(({ coordinate, hemisphere }) => {
        const [degrees, minutes, seconds] = coordinate
          .split(`,`, 3)
          .map(parseFloat)
        const sign = hemisphere == `W` || hemisphere == `S` ? -1 : 1
        return sign * (degrees + minutes / 60 + seconds / 3600)
      })
    : undefined
}
