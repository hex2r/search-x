import { ResultsList, Logo, SearchPageTemplate } from "./components"
import { SearchProvider } from "./contexts"
import { SearchControl } from "./components/SearchControl"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./main.css"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
