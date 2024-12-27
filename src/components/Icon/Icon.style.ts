import styled from "@emotion/styled"
import type { Global } from "../../config/types"

const SCALES = {
  small: 0.75,
  medium: 1,
  large: 1.5,
} satisfies Global.ComponentScale

export const Icon = styled.div<{
  $scale: Global.Scale
}>`
  &,
  svg {
    width: ${(props) => SCALES[props.$scale]}rem;
    height: ${(props) => SCALES[props.$scale]}rem;
    fill: currentColor;
  }

  color: #9aa0a6;
`
