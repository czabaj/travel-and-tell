import { html } from "/utils/h.js"

function Layout({ children, sidebar }) {
  return html`
    <div class="min-h-screen md:flex bg-gray-100">
      <div class="flex-none w-full md:max-w-xs bg-purple text-white">
        ${sidebar}
      </div>
      <div class="flex-1 bg-blue text-white">
        ${children}
      </div>
    </div>
  `
}

export default Layout
