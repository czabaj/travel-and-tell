// https://github.com/lukejacksonn/csz
import dayjs from "dayjs"
// https://day.js.org/docs/en/parse/string-format
import customParseFormat from "dayjs/esm/plugin/customParseFormat/index.js"
// https://day.js.org/docs/en/display/format#localized-formats
import localizedFormat from "dayjs/esm/plugin/localizedFormat/index.js"
// https://preactjs.com
// https://github.com/developit/unistore#readme
import { connect } from "unistore/full/preact.es.js"
// https://refract.js.org/usage/connecting-to-react

export * from "preact/hooks"
export { createPortal, forwardRef, memo } from "preact/compat"
export { createSelector, createStructuredSelector } from "reselect"

dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

// TODO: when the times come, try refract with unistore, take it via
// context.store and exploit store.subscribe
// @see https://github.com/developit/unistore/blob/master/devtools.js

export { connect }
