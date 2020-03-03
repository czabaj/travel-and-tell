import { cn } from "/utils/css.js"
import { html } from "/utils/h.js"

function Button({ disabled, to, ...other }) {
  const className = cn(
    `btn`,
    disabled ? "btn-gray" : "btn-indigo",
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

export default Button
