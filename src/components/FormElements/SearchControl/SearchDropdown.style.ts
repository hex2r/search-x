import styled from "@emotion/styled"
import type { Global } from "../../../config/types"

const SCALES = {
  small: 0.75,
  medium: 1,
  large: 1.5,
} satisfies Global.ComponentScale

const THEMES = {
  material: ({ scale }) => `
      margin-top: -1px;
      box-shadow: 0 0.4rem 0.5rem 0 rgba(60, 64, 67, 0.25);
      border-radius: 0 0 ${scale}rem ${scale}rem;
      background: #fff;
      color: #333;

      &::before {
        display: block;
        content: "";
        border-top: 1px solid #e8eaed;
        margin: 0 ${scale}rem 0.25rem;
      }
    `,
} satisfies Global.ComponentTheme

export const SearchDropdown = styled.div<{
  $scale: Global.Scale
  $theme: Global.Theme
}>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2;
  width: 100%;
  padding-bottom: ${(props) => SCALES[props.$scale]}rem;
  ${(props) => THEMES[props.$theme]({ scale: SCALES[props.$scale] })};
`

export const DeleteButton = styled.button`
  background: none;
  border: 0;
  color: #666;

  &:focus,
  &:hover {
    color: #1558d6;
    cursor: pointer;
    text-decoration: underline;
  }

  &:active {
    color: #1045a7;
  }
`
