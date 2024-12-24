import { ResultsList, Logo, SearchPageTemplate } from "./components"
import { ThemeProvider, SearchProvider } from "./contexts"
import { XSearchControl } from "./components/XSearchControl"

function App() {
  return (
    <ThemeProvider>
      <SearchPageTemplate>
        <div>
          <Logo />
        </div>
        <SearchProvider>
          <XSearchControl />
          <ResultsList />
        </SearchProvider>
      </SearchPageTemplate>
    </ThemeProvider>
  )
}

export default App
