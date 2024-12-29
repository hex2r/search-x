import { useEffect } from "react"
import type { RefObject } from "react"

export default function useEffectOutsideClick<T>(
  ref: RefObject<HTMLElement>,
  callback: () => T
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
