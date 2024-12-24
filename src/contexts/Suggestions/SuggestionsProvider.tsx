import { useState, PropsWithChildren, useEffect } from "react"
import SuggestionsContext from "./SuggestionsContext"
import type { SuggestionEntity } from "./types"
import { fakeSuggestionsRequest } from "../../utils"
import { SUGGESTIONS_URL } from "../../config"

const SuggestionsProvider = ({ children }: PropsWithChildren) => {
  const [suggestions, setSuggestions] = useState<SuggestionEntity[]>([])

  useEffect(() => {
    fakeSuggestionsRequest<SuggestionEntity>({
      succeed: true,
      url: SUGGESTIONS_URL.href,
      timeout: 0,
    })
      .then((data) => {
        setSuggestions(data.results)
      })
      .catch((err) => {
        console.error(err, "Failed to get autocomplete suggestions")
      })
  }, [])

  return (
    <SuggestionsContext.Provider value={suggestions}>
      {children}
    </SuggestionsContext.Provider>
  )
}

export default SuggestionsProvider
