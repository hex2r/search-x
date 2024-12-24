export type SearchItem = {
  id: string
  url: string
  title: string
  description: string
}

export type SuggestionEntity = {
  id: string
  search: string
}

export type SearchSuggestion = {
  type: "suggestion"
  content: SuggestionEntity
}

export type HistorySuggestion = {
  type: "history"
  content: SuggestionEntity & {
    onDelete: (recordName: string) => void
  }
}

export type AutoCompletion = HistorySuggestion | SearchSuggestion

export type SearchHistoryRecord = { [searchQuery: string]: SearchItem[] }
