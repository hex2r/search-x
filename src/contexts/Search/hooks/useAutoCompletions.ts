import { useState, useEffect, useCallback } from "react"
import type {
  SuggestionEntity,
  SearchSuggestion,
  HistorySuggestion,
  SearchItem,
  AutoCompletion,
} from "../types"

type UseAutoCompletions = {
  getSearchHistory: () => { [key: string]: Array<SearchItem> }
  deleteSearchHistoryRecord: (recordKey: string) => void
  suggestions: SuggestionEntity[]
  query: string
  defaultAutoCompletions?: AutoCompletion[]
}

const useAutoCompletions = ({
  getSearchHistory,
  deleteSearchHistoryRecord,
  suggestions,
  defaultAutoCompletions = [],
  query,
}: UseAutoCompletions) => {
  const [autoCompletions, setAutoCompletions] = useState<AutoCompletion[]>(
    defaultAutoCompletions
  )

  const filterSuggestions = useCallback(
    ({
      query,
      suggestions,
    }: {
      query: string
      suggestions: SuggestionEntity[]
    }): SearchSuggestion[] => {
      const filteredSuggestions = suggestions.reduce<unknown[]>((acc, curr) => {
        if (
          curr.search.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return [
            ...acc,
            {
              type: "suggestion",
              content: {
                id: curr.id,
                search: curr.search,
              },
            },
          ]
        }
        return acc
      }, []) as unknown
      return filteredSuggestions as SearchSuggestion[]
    },
    []
  )

  const filterHistorySuggestions = useCallback(
    ({
      query,
      suggestions,
    }: {
      query: string
      suggestions: string[]
    }): HistorySuggestion[] => {
      const filteredSuggestions = suggestions.reduce<unknown[]>((acc, curr) => {
        if (curr.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
          return [
            ...acc,
            {
              type: "history",
              content: {
                id: curr,
                search: curr,
                onDelete: deleteSearchHistoryRecord,
              },
            },
          ]
        }
        return acc
      }, []) as unknown
      return filteredSuggestions as HistorySuggestion[]
    },
    [deleteSearchHistoryRecord]
  )

  useEffect(() => {
    console.log("render", autoCompletions)
    const searchSuggestions = filterSuggestions({
      query,
      suggestions,
    })

    const historySuggestions = filterHistorySuggestions({
      query,
      suggestions: Object.keys(getSearchHistory()),
    })

    setAutoCompletions([...searchSuggestions, ...historySuggestions])
  }, [query, suggestions])

  return { autoCompletions }
}

export default useAutoCompletions
