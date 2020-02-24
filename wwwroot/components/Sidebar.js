import dayjs from "/web_modules/dayjs.js"
import * as R from "/web_modules/ramda.js"

import Button from "/components/Button.js"
import FileInput from "/components/FileInput.js"
import { connect, html } from "/utils/h.js"
import { imageToDataUrl } from "/utils/file.js"

const withSidebar = connect("files", {
  addFile: async (state, newFiles) => {
    const images = await Promise.all(newFiles.map(imageToDataUrl))
    const newState = R.over(
      R.lensProp("files"),
      R.unionWith(R.eqBy(R.prop("id")), images),
      state,
    )
    return newState
  },
})

function Sidebar({ addFile, files }) {
  return html`
    <div className="bg-indigo-300 min-h-screen px-4 py-2">
      <${FileInput} droppable multiple onChange=${addFile} values=${files}>
        ${({ draggedOver, openFileDialog }) =>
          html`
            <div>
              <${Button} indigo onClick=${openFileDialog}>
                Load images
              <//>
            </div>
            <div>
              ${files.map(
                file =>
                  html`
                    <div>
                      ${file.filename} ${dayjs(file.datetime).format("L")}
                    </div>
                  `,
              )}
            </div>
          `}
      <//>
    </div>
  `
}

export default withSidebar(Sidebar)
