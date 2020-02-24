// https://github.com/lukejacksonn/csz
import css from "/web_modules/csz.js"
import dayjs from "/web_modules/dayjs.js"
// https://day.js.org/docs/en/parse/string-format
import customParseFormat from "/web_modules/dayjs/esm/plugin/customParseFormat/index.js"
// https://day.js.org/docs/en/display/format#localized-formats
import localizedFormat from "/web_modules/dayjs/esm/plugin/localizedFormat/index.js"
// https://github.com/developit/htm
import htm from "/web_modules/htm.js"
// https://preactjs.com
import { h, Fragment } from "/web_modules/preact.js"
// https://github.com/developit/unistore#readme
import { connect } from "/web_modules/unistore/full/preact.es.js"
// https://refract.js.org/usage/connecting-to-react

export * from "/web_modules/preact/hooks.js"

dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

const html = htm.bind(h)

// TODO: when the times come, try refract with unistore, take it via
// context.store and exploit store.subscribe
// @see https://github.com/developit/unistore/blob/master/devtools.js

export { Fragment, connect, css, html }
