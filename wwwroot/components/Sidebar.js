import * as R from "/web_modules/ramda.js"

import Button from "/components/Button.js"
import FileInput from "/components/FileInput.js"
import { connect, html, withEffects, useState, useEffect } from "/utils/h.js"
import { imageToDataUrl } from "/utils/file.js"

const aperture = (component, initialProps) => {
  const file$ = component.observe("file")
  return file$.filter(file => file)
}
const handler = initialProps => effect => {}

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
                    <div>${JSON.stringify(file, null, 2)}</div>
                  `,
              )}
            </div>
          `}
      <//>
    </div>
  `
}

export default R.compose(
  connect("files", _ => ({
    addFile: async (state, files) => {
      const images = await Promise.all(files.map(imageToDataUrl))
      const newState = R.over(
        R.lensProp("files"),
        R.unionWith(R.eqBy(R.prop("id")), images),
        state,
      )
      return newState
    },
  })),
  withEffects(aperture, { handler }),
)(Sidebar)
