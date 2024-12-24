import { ResultsList, Logo, SearchPageTemplate } from "./components"
import { ThemeProvider, SuggestionsProvider, SearchProvider } from "./contexts"
import { XSearchControl } from "./components/XSearchControl"

function App() {
  return (
    <ThemeProvider>
      <SearchPageTemplate>
        <div>
          <Logo />
        </div>
        <SearchProvider>
          <SuggestionsProvider>
            <XSearchControl />
          </SuggestionsProvider>
          <ResultsList />
        </SearchProvider>
      </SearchPageTemplate>
    </ThemeProvider>
  )
}

export default App
