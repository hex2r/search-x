import { useContext } from "react"
import SearchContext from "./SuggestionsContext"

const useSuggestionsContext = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new ReferenceError(
      "The following component should be used within SearchContext"
    )
  }

  return context
}

export default useSuggestionsContext
