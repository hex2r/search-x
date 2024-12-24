import { useState, PropsWithChildren, useEffect } from "react"
import SuggestionsContext from "./SuggestionsContext"
import type { SuggestionEntity } from "./types"
import { fetchSuggestions } from "../../api"

const SuggestionsProvider = ({ children }: PropsWithChildren) => {
  const [suggestions, setSuggestions] = useState<SuggestionEntity[]>([])

  useEffect(() => {
    const abortController = new AbortController()

    fetchSuggestions<SuggestionEntity>(abortController.signal).then(
      (suggestions) => {
        if (suggestions) {
          setSuggestions(suggestions)
        }
      }
    )

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <SuggestionsContext.Provider value={suggestions}>
      {children}
    </SuggestionsContext.Provider>
  )
}

export default SuggestionsProvider
