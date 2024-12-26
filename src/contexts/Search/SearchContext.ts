import { createContext, Dispatch, SetStateAction } from "react"

type SearchContext = {
  query: string
  search: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<SearchContext | null>(null)

export default SearchContext
