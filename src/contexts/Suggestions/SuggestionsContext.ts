import { createContext } from "react"
import type { SuggestionEntity } from "./types"

const SuggestionsContext = createContext<SuggestionEntity[] | null>(null)

export default SuggestionsContext
