import { html } from "/utils/h.js"

function Layout({ children, panel, sidebar }) {
  return html`
    <div class="min-h-screen md:flex bg-gray-100">
      <div class="flex-none w-full md:max-w-xs bg-purple text-white">
        ${sidebar}
      </div>
      <div class="flex-1 bg-blue text-white">
        <div class="flex flex-col min-h-screen">
          <div class="flex-1 relative">${children}</div>
          <div class="bg-blue-500">
            ${panel}
          </div>
        </div>
      </div>
    </div>
  `
}

export default Layout
