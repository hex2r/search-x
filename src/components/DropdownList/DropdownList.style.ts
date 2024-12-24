import styled from "@emotion/styled"
import type { Global } from "../../config/types"

const SCALES = {
  small: 0.75,
  medium: 1,
  large: 1.5,
} satisfies Global.ComponentScale

export const DropdownList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  border-radius: inherit;
`

export const DropdownListItem = styled.li<{
  $scale: Global.Scale
}>`
  display: flex;
  align-items: center;
  gap: ${(props) => SCALES[props.$scale]}rem;
  padding: ${(props) => SCALES[props.$scale] / 2}rem
    ${(props) => SCALES[props.$scale]}rem;
  font-size: ${(props) => SCALES[props.$scale]}rem;
  user-select: none;

  &:focus-within,
  &:focus,
  &:hover {
    background: #f2f2f2;
  }

  &:active {
    background: #ececec;
  }

  &:focus {
    outline: none;
  }
`
