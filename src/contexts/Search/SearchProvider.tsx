import { PropsWithChildren } from "react"
import SuggestionsContext from "./SearchContext"
import useSearch from "./hooks/useSearch"
import useAutoCompletions from "./hooks/useAutoCompletions"

const SearchProvider = ({ children }: PropsWithChildren) => {
  const {
    deleteSearchHistoryRecord,
    error,
    getSearchHistory,
    isLoading,
    search,
    searchResults,
    suggestions,
    query,
  } = useSearch()
  const { autoCompletions } = useAutoCompletions({
    query,
    getSearchHistory,
    deleteSearchHistoryRecord,
    suggestions,
  })

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
