import type { FC } from "react"
import * as Styled from "./Icon.style"
import type { Global } from "../../config/types"

const IconPlaceholder: FC<Global.ScaleProperty> = ({ scale }) => {
  return <Styled.IconPlaceholder $scale={scale} />
}

export default IconPlaceholder
