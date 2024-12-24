import styled from "@emotion/styled"
import type { Global } from "../../config/types"

const THEMES = {
  material: () => `
    color: #1a0dab;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:visited {
      color: #681da8;
    }
  `,
} satisfies Global.ComponentTheme

export const Link = styled.a<{ $theme: Global.Theme }>`
  ${(props) => THEMES[props.$theme]()}
`
