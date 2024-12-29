import { Global } from "@emotion/react"
import { ErrorBoundary } from "react-error-boundary"
import { globalCSS } from "./global.style.ts"
import { ResultsList, Logo, SearchPageTemplate } from "./components"
import { SearchProvider } from "./contexts"
import { SearchControl, ErrorFallback } from "./components"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ErrorInfo } from "react"

const queryClient = new QueryClient()

const logError = (error: Error, info: ErrorInfo) => {
  console.error(error, info.componentStack)
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalCSS} />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
        <SearchPageTemplate logo={<Logo />}>
          <SearchProvider>
            <SearchControl id="search" autoFocus />
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
              <ResultsList />
            </ErrorBoundary>
          </SearchProvider>
        </SearchPageTemplate>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
