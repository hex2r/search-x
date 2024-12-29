import { useEffect } from "react"
import type { RefObject } from "react"

export default function useEffectOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target

      if (
        target instanceof HTMLElement &&
        ref.current &&
        !ref.current.contains(target)
      ) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback])
}
