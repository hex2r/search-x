import {
  forwardRef,
  InputHTMLAttributes,
  CSSProperties,
  ChangeEvent,
} from "react"

import * as Styled from "./InputField.style"
import { DEFAULT_SCALE } from "../../config"
import type { Global } from "../../config/types"

export type InputField = InputHTMLAttributes<HTMLInputElement> & {
  scale?: Global.Scale
  cx?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputField = forwardRef<HTMLInputElement, InputField>(
  ({ type = "text", scale = DEFAULT_SCALE, cx, onChange, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e)
    }

    return (
      <Styled.InputField
        ref={ref}
        $scale={scale}
        type={type}
        style={cx}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
