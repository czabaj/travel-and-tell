import { cn, h } from "../utils/h"

function Button({ disabled, to, ...other }) {
  const className = cn(
    `btn`,
    disabled ? "btn-gray" : "btn-indigo",
    other.className,
  )

  return to ? (
    <a {...other} className={className} href={to} />
  ) : (
    <button {...other} className={className} />
  )
}

export default Button
