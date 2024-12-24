import { PropsWithChildren } from "react"
import SuggestionsContext from "./SearchContext"
import useSearch from "./hooks/useSearch"

const SearchProvider = ({ children }: PropsWithChildren) => {
  const { search, searchResults, autoCompletions, error, isLoading } =
    useSearch()

  return (
    <SuggestionsContext.Provider
      value={{
        searchResults,
        isLoading,
        error,
        search,
        autoCompletions,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  )
}

export default SearchProvider
