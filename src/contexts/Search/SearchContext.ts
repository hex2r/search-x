import { createContext, Dispatch, SetStateAction } from "react"
import type { SearchEntry } from "./types"

type SearchContext = {
  query: string
  searchResults: SearchEntry[]
  isLoading: boolean
  error: null | Error
  search: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<SearchContext | null>(null)

export default SearchContext
