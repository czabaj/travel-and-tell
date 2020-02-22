// https://github.com/lukejacksonn/csz
import css from "/web_modules/csz.js"
// https://github.com/developit/htm
import htm from "/web_modules/htm.js"
// https://preactjs.com
import { h } from "/web_modules/preact.js"
// https://github.com/developit/unistore#readme
import { connect } from "/web_modules/unistore/full/preact.es.js"
// https://refract.js.org/usage/connecting-to-react
import { withEffects } from "/web_modules/refract-preact-most.js"

export * from "/web_modules/preact/hooks.js"

const html = htm.bind(h)

// TODO: when the times come, try refract with unistore, take it via
// context.store and exploit store.subscribe
// @see https://github.com/developit/unistore/blob/master/devtools.js

export { connect, css, html, withEffects }
