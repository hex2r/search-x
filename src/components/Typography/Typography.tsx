import { FC, PropsWithChildren, CSSProperties } from "react"
import styled from "@emotion/styled"
import { styles, cropText } from "./Typography.style"

type TypographyTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"

type Typography = {
  tag: TypographyTags
  cropped?: boolean
  cx?: CSSProperties
} & PropsWithChildren

const Typography: FC<Typography> = ({
  tag = "p",
  cropped = false,
  children,
  cx,
}) => {
  const CustomTag = styled(tag)`
    ${styles}

    ${cropped && cropText}
  `

  return <CustomTag style={cx}>{children}</CustomTag>
}

export default Typography
