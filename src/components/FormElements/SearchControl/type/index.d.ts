export type SuggestionEntity = {
  id: string
  search: string
}

export type SearchSuggestion = {
  type: "suggestion"
} & SuggestionEntity

export type HistorySuggestion = {
  type: "history"
} & SuggestionEntity

export type SupportedSearchSuggestions = SearchSuggestion | HistorySuggestion
