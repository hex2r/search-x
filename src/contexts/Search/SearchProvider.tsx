import { PropsWithChildren } from "react"
import SuggestionsContext from "./SearchContext"
import useSearch from "./hooks/useSearch"

const SearchProvider = ({ children }: PropsWithChildren) => {
  const { query, search } = useSearch()

  return (
    <SuggestionsContext.Provider
      value={{
        query,
        search,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  )
}

export default SearchProvider
