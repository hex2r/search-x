import { css } from "@emotion/react"

export const globalCSS = css`
  :root {
    /* --system-ui: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; */
    --system-ui: Arial, sans-serif;
  }

  body {
    margin: 0;
    font-family: var(--system-ui);
  }
`
