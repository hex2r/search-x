import ErrorBanner from "./ErrorBanner"

export default function ErrorFallback({
  error,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return <ErrorBanner message={error.message} />
}
