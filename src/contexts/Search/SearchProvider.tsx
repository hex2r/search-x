import { PropsWithChildren } from "react"
import SuggestionsContext from "./SearchContext"
import useSearch from "./hooks/useSearch"

const SearchProvider = ({ children }: PropsWithChildren) => {
  const { query, searchResults, isLoading, error, search } = useSearch()

  return (
    <SuggestionsContext.Provider
      value={{
        query,
        searchResults,
        isLoading,
        error,
        search,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  )
}

export default SearchProvider
