import { cn } from "/utils/css.js"
import { html } from "/utils/h.js"

export default ({ to, gray, indigo, ...other }) => {
  const className = cn(
    `btn`,
    { "btn-gray": gray, "btn-indigo": indigo },
    other.className,
  )

  return to
    ? html`
        <a ...${other} className=${className} href="${to}" />
      `
    : html`
        <button ...${other} className=${className} />
      `
}
