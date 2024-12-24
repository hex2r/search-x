import { Typography } from "../Typography"
import * as Styled from "./Logo.style"
import LogoIcon from "../../assets/X_logo.svg?react"

const Logo = () => {
  return (
    <Styled.Logo href="/">
      <LogoIcon />
      <Typography tag="h1">Search</Typography>
    </Styled.Logo>
  )
}

export default Logo
