import styled from "@emotion/styled"
import type { Global } from "../../config/types"

const SCALES = {
  small: 0.75,
  medium: 1,
  large: 1.5,
} satisfies Global.ComponentScale

const THEMES = {
  material: () => `
      color: #9aa0a6
    `,
} satisfies Global.ComponentTheme

export const IconPlaceholder = styled.div<{
  $scale: Global.Scale
}>`
  width: ${(props) => SCALES[props.$scale]}rem;
  height: ${(props) => SCALES[props.$scale]}rem;
  background: #999;
`

export const Icon = styled.div<{
  $scale: Global.Scale
  $theme: Global.Theme
}>`
  &,
  svg {
    width: ${(props) => SCALES[props.$scale]}rem;
    height: ${(props) => SCALES[props.$scale]}rem;
    fill: currentColor;
  }

  ${(props) => THEMES[props.$theme]()}
`
