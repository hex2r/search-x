import { Typography } from "../Typography"

const ErrorBanner = ({
  name = "Error",
  message,
}: {
  name?: string
  message: string
}) => {
  return (
    <pre>
      <code>
        <Typography tag="h3">{name}!</Typography>
        <br />
        <Typography tag="p">{message}</Typography>
      </code>
    </pre>
  )
}

export default ErrorBanner
