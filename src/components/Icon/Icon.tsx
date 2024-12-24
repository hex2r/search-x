import type { FC, PropsWithChildren, CSSProperties } from "react"
import * as Styled from "./Icon.style"
import type { Global } from "../../config/types"
import { DEFAULT_THEME } from "../../config"

type Icon = {
  theme: Global.Theme
  cx?: CSSProperties
} & Global.ScaleProperty &
  PropsWithChildren

const Icon: FC<Icon> = ({ children, scale, theme = DEFAULT_THEME, cx }) => {
  return (
    <Styled.Icon tabIndex={-1} $scale={scale} $theme={theme} style={cx}>
      {children}
    </Styled.Icon>
  )
}

export default Icon
