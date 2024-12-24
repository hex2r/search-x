import { css } from "@emotion/react"

const TYPOGRAPHY = {
  h1: "2.5rem",
  h2: "2rem",
  h3: "1.75rem",
  h4: "1.5rem",
  h5: "1.25rem",
  h6: "1rem",
  default: "1rem",
}

export const styles = css`
  --h1-font-size: ${TYPOGRAPHY.h1};
  --h2-font-size: ${TYPOGRAPHY.h2};
  --h3-font-size: ${TYPOGRAPHY.h3};
  --h4-font-size: ${TYPOGRAPHY.h4};
  --h5-font-size: ${TYPOGRAPHY.h5};
  --h6-font-size: ${TYPOGRAPHY.h6};
  --default-font-size: ${TYPOGRAPHY.h6};

  text-rendering: geometricPrecision;

  h1&,
  h2&,
  h3&,
  h4&,
  h5&,
  h6& {
    margin: 0;
    font-weight: 400;
  }

  span&,
  p& {
    font-size: var(--default-font-size);
    line-height: 1.5;
    letter-spacing: 0.02cap;
  }

  p& {
    margin-top: 0;
    margin-bottom: 0;
  }

  h1& {
    font-size: var(--h1-font-size);
  }

  h2& {
    font-size: var(--h2-font-size);
  }

  h3& {
    font-size: var(--h3-font-size);
  }

  h4& {
    font-size: var(--h4-font-size);
  }

  h5& {
    font-size: var(--h5-font-size);
  }

  h6& {
    font-size: var(--h6-font-size);
  }
`

export const cropText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
