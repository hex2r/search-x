import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Global } from "@emotion/react"
import { globalCSS } from "./global.style.ts"
import { ResultsList, Logo, SearchPageTemplate } from "./components"
import { SearchProvider } from "./contexts"
import { SearchControl } from "./components/SearchControl"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalCSS} />
      <SearchPageTemplate logo={<Logo />}>
        <SearchProvider>
          <SearchControl id="search" autoFocus />
          <ResultsList />
        </SearchProvider>
      </SearchPageTemplate>
    </QueryClientProvider>
  )
}

export default App
