// https://github.com/lukejacksonn/csz
import dayjs from "dayjs"
// https://day.js.org/docs/en/parse/string-format
import customParseFormat from "dayjs/esm/plugin/customParseFormat/index.js"
// https://day.js.org/docs/en/display/format#localized-formats
import localizedFormat from "dayjs/esm/plugin/localizedFormat/index.js"
// https://preactjs.com
export { h } from "preact"
export { Fragment, createPortal, forwardRef, memo } from "preact/compat"
export * from "preact/hooks"
export { createSelector, createStructuredSelector } from "reselect"
// https://github.com/developit/unistore#readme
export { connect } from "unistore/full/preact.es.js"

export { cn } from "./css"

dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

// TODO: when the times come, try refract with unistore, take it via
// context.store and exploit store.subscribe
// @see https://github.com/developit/unistore/blob/master/devtools.js
