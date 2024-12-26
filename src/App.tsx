import { ResultsList, Logo, SearchPageTemplate } from "./components"
import { ThemeProvider, SearchProvider } from "./contexts"
import { SearchControl } from "./components/SearchControl"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./main.css"

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SearchPageTemplate>
          <div>
            <Logo />
          </div>
          <SearchProvider>
            <SearchControl id="search" autoFocus />
            <ResultsList />
          </SearchProvider>
        </SearchPageTemplate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
