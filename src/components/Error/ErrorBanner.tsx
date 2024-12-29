import { Typography } from "../Typography"
import * as Styled from "./ErrorBanner.style"

const ErrorBanner = ({
  name = "Error",
  message,
}: {
  name?: string
  message: string
}) => {
  return (
    <Styled.ErrorBanner>
      <pre>
        <code>
          <Typography tag="h3">{name}!</Typography>
          <br />
          <Typography tag="p">{message}</Typography>
        </code>
      </pre>
    </Styled.ErrorBanner>
  )
}

export default ErrorBanner
