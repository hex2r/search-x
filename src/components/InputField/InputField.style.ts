import styled from "@emotion/styled"

import type { Global } from "../../config/types"

const SCALES = {
  small: 0.75,
  medium: 1,
  large: 1.5,
} satisfies Global.ComponentScale

export const InputField = styled.input<{
  $scale: Global.Scale
}>`
  width: 100%;
  box-sizing: border-box;
  font-size: ${(props) => SCALES[props.$scale]}rem;
  padding: ${(props) => SCALES[props.$scale] * 0.825}rem
    ${(props) => SCALES[props.$scale]}rem;
  border: 0;
  box-shadow: 0 0.125rem 0.5rem 0 rgba(60, 64, 67, 0.25);
  border-radius: ${(props) => SCALES[props.$scale]}rem;
  background-color: #fff;
  color: #333;

  &:focus {
    outline: none;
  }

  &[type="search"]::-webkit-search-cancel-button {
    appearance: none;
  }
`
