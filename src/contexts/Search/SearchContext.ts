import { createContext, Dispatch, SetStateAction } from "react"
import { SearchItem } from "./types"

type SearchContext = {
  searchResults: SearchItem[]
  isLoading: boolean
  error: null | Error
  search: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<SearchContext | null>(null)

export default SearchContext
