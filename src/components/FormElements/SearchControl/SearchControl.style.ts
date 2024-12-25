import styled from "@emotion/styled"

import type { Global } from "../../../config/types"

const SCALES = {
  small: 0.75,
  medium: 1,
  large: 1.5,
} satisfies Global.ComponentScale

export const SearchControl = styled.div<{
  $isDropdownVisible: boolean
  $scale: Global.Scale
}>`
  position: relative;

  ${(props) =>
    props.$isDropdownVisible &&
    `input {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
  }`}

  input {
    padding-left: ${(props) => SCALES[props.$scale] * 3}rem;
    padding-right: ${(props) => SCALES[props.$scale] * 3}rem;
  }
`

export const SearchLabel = styled.label<{
  $scale: Global.Scale
}>`
  position: absolute;
  top: 50%;
  left: ${(props) => SCALES[props.$scale]}rem;
  transform: translateY(-50%);
`

export const SearchControlBar = styled.div<{
  $scale: Global.Scale
}>`
  position: absolute;
  right: ${(props) => SCALES[props.$scale]}rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
`

export const ButtonResetSearch = styled.button`
  padding: 0;
  border: 0;
  background: none;
`
