import { FC, HTMLAttributes, PropsWithChildren, CSSProperties } from "react"
import { DEFAULT_THEME } from "../../config"
import type { Global } from "../../config/types"
import * as Styled from "./Link.style"

type Link = {
  href: string
  target: "_blank" | "_self" | "_parent" | "_top"
  cx?: CSSProperties
} & Global.ThemeProperty &
  PropsWithChildren &
  HTMLAttributes<HTMLAnchorElement>

const Link: FC<Link> = ({
  href = "#",
  target,
  theme = DEFAULT_THEME,
  cx,
  ...props
}) => {
  return (
    <Styled.Link
      $theme={theme}
      href={href}
      target={target}
      style={cx}
      {...props}
    >
      {props.children}
    </Styled.Link>
  )
}

export default Link
