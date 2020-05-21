import dayjs from "dayjs"
import { compose } from "ramda"

import { cn, h } from "../utils/h"
import { preventDefault } from "../utils/misc"

function SidebarItem({ active, dispatchSelect, photo, selection }) {
  return (
    <div
      className={cn(
        "flex items-center px-3 py-3 hover:bg-indigo-500",
        active && "bg-indigo-400",
      )}
    >
      <input
        data-id={photo.id}
        name={`photos_${photo.id}`}
        onChange={compose(dispatchSelect, preventDefault)}
        type="checkbox"
        checked={Boolean(selection[photo.id])}
      />
      <div className="flex-1 hover:cursor-pointer pl-2">{photo.filename}</div>
      <div>{dayjs(photo.datetime).format("L")}</div>
    </div>
  )
}

export default SidebarItem
