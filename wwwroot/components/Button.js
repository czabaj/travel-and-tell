import { cn } from "/utils/css.js"
import { html } from "/utils/h.js"

export default ({ to, ...other }) => {
  const className = cn(
    `inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-sm uppercase tracking-wider`,
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
