import { createContext, Dispatch, SetStateAction } from "react"
import type { SearchItem, AutoCompletion } from "./types"

type SearchContext = {
  searchResults: SearchItem[]
  isLoading: boolean
  error: null | Error
  search: Dispatch<SetStateAction<string>>
  autoCompletions: AutoCompletion[]
}

const SearchContext = createContext<SearchContext | null>(null)

export default SearchContext
