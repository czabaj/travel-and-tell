import { h } from "preact"

import { useEffect, useMemo } from "../utils/h.js"

const urlCreator = window.URL || window.webkitURL

function Image({ blob }) {
  const dataUrl = useMemo(() => urlCreator.createObjectURL(blob), [blob])
  useEffect(() => {
    urlCreator.revokeObjectURL(dataUrl)
  }, [dataUrl])

  return <img src={dataUrl} />
}

export default Image
