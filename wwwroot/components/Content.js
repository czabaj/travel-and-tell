import { html } from "/utils/h.js"

function Content({ children }) {
  return html`
    <div className="px-4 py-2">${children}</div>
  `
}

export default Content
