import { PropsWithChildren } from "react"
import SuggestionsContext from "./SearchContext"
import useSearch from "./useSearch"

const SearchProvider = ({ children }: PropsWithChildren) => {
  const { searchResults, isLoading, error, search } = useSearch()

  return (
    <SuggestionsContext.Provider
      value={{ searchResults, isLoading, error, search }}
    >
      {children}
    </SuggestionsContext.Provider>
  )
}

export default SearchProvider
