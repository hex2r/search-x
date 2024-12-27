import { FC, HTMLAttributes, PropsWithChildren, CSSProperties } from "react"
import * as Styled from "./Link.style"

type Link = {
  href: string
  target: "_blank" | "_self" | "_parent" | "_top"
  cx?: CSSProperties
} & PropsWithChildren &
  HTMLAttributes<HTMLAnchorElement>

const Link: FC<Link> = ({ href = "#", target, cx, ...props }) => {
  return (
    <Styled.Link href={href} target={target} style={cx} {...props}>
      {props.children}
    </Styled.Link>
  )
}

export default Link
