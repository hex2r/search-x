import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

const progress = keyframes`
  0% {
    transform: translate3d(-90%, 0, 0);
  }
  
  50% {
    transform: translate3d(-30%, 0, 0);
  }

  60% {
    transform: translate3d(-20%, 0, 0);
  }

  75% {
    transform: translate3d(-10%, 0, 0);
  }

  100% {
    transform: translate3d(-2%, 0, 0);
  }

`

export const Progress = styled.div`
  height: 1px;
  width: 100%;
  background-color: #dadce0;
  overflow: hidden;
  border-radius: 1rem;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: inherit;
    background: black;
    animation: ${progress} 500ms ease-out;
    animation-fill-mode: forwards;
    will-change: transform;
  }
`
