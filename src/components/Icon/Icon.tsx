import type { FC, PropsWithChildren, CSSProperties } from "react"
import * as Styled from "./Icon.style"
import type { Global } from "../../config/types"

type Icon = {
  cx?: CSSProperties
} & Global.ScaleProperty &
  PropsWithChildren

const Icon: FC<Icon> = ({ children, scale, cx }) => {
  return (
    <Styled.Icon tabIndex={-1} $scale={scale} style={cx}>
      {children}
    </Styled.Icon>
  )
}

export default Icon
