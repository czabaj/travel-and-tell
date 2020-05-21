import * as R from "ramda"

import { connect, useEffect } from "../utils/h"
import { updateFocusedPhotoIndex } from "../utils/store"

const withHotkeys = connect(null, {
  goNextPhoto: updateFocusedPhotoIndex(R.inc),
  goPreviousPhoto: updateFocusedPhotoIndex(R.dec),
})

const Hotkeys = withHotkeys(({ goNextPhoto, goPreviousPhoto }) => {
  useEffect(() => {
    Mousetrap.bind(["down", "right"], goNextPhoto)
    Mousetrap.bind(["up", "left"], goPreviousPhoto)

    return () => {
      Mousetrap.unbind(["down", "right"])
      Mousetrap.unbind(["up", "left"])
    }
  }, [goNextPhoto, goPreviousPhoto])

  return null
})

export default Hotkeys
