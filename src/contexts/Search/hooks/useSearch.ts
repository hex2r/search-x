import { useState, useEffect, useCallback } from "react"
import {
  fakeSearchRequest,
  fakeSuggestionsRequest,
  transformToSuggestions,
} from "../../../utils"
import {
  SUGGESTIONS_URL,
  SEARCH_QUERY_PARAM,
  SUPPORTED_SEARCH_SUGGESTIONS,
} from "../../../config"
import type { SearchItem, SearchSuggestion, HistorySuggestion } from "../types"

const useSearch = () => {
  const [query, setQuery] = useState(
    new URL(window.location.href).searchParams.get("query") || ""
  )
  const [isFetched, setFetched] = useState(false)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [historySuggestions, setHistorySuggestions] = useState<string[]>([])
  const [autoCompletions, setAutoCompletions] = useState<
    SearchSuggestion[] | HistorySuggestion[]
  >([])

  const deleteHistorySuggestion = useCallback(
    (historyQuery: string) => {
      console.log("remove >", query)
      setHistorySuggestions(
        historySuggestions.filter((historyItem) => historyItem !== historyQuery)
      )
    },
    [query, historySuggestions]
  )

  const fetchSearchSuggestions = useCallback(() => {
    fakeSuggestionsRequest<string>({
      succeed: true,
      url: SUGGESTIONS_URL.href,
    })
      .then((data) => {
        setSearchSuggestions(data.results)
      })
      .catch((err) => {
        console.error(err, "Failed to get autocomplete suggestions")
      })
  }, [])

  const storeHistorySuggestion = useCallback(() => {
    if (query && !historySuggestions.includes(query) && isFetched) {
      console.log("add", query)
      setHistorySuggestions((prevState) => [...prevState, query])
    }
  }, [query, historySuggestions, isFetched])

  const handleAutoCompletions = useCallback(() => {
    setAutoCompletions([
      ...transformToSuggestions<string, HistorySuggestion>({
        suggestions: historySuggestions,
        type: SUPPORTED_SEARCH_SUGGESTIONS.history,
        actions: {
          onDelete: deleteHistorySuggestion,
        },
        ...transformToSuggestions<string, SearchSuggestion>({
          suggestions: searchSuggestions,
          type: SUPPORTED_SEARCH_SUGGESTIONS.search,
        }),
      }),
    ])
  }, [historySuggestions, searchSuggestions, deleteHistorySuggestion])

  const handleSearch = useCallback(() => {
    if (!query) return

    console.table({ query: query })

    const url = new URL(window.location.href)

    if (!url.searchParams.has(SEARCH_QUERY_PARAM)) {
      url.searchParams.append(SEARCH_QUERY_PARAM, query)
    }

    if (url.searchParams.get(SEARCH_QUERY_PARAM) !== query) {
      url.searchParams.set(SEARCH_QUERY_PARAM, query)
    }

    history.pushState({}, "", url.href)

    setFetched(false)

    fakeSearchRequest<SearchItem>({ url: window.location.href })
      .then((data) => {
        setSearchResults(data.results)
        setFetched(true)
      })
      .catch((error) => {
        setFetched(true)
        setError(error)
      })
  }, [query, setFetched])

  useEffect(handleAutoCompletions, [handleAutoCompletions])

  useEffect(handleSearch, [query, setFetched, handleSearch])

  useEffect(storeHistorySuggestion, [
    query,
    historySuggestions,
    isFetched,
    storeHistorySuggestion,
  ])

  useEffect(fetchSearchSuggestions, [fetchSearchSuggestions])

  return {
    searchResults,
    autoCompletions,
    isLoading: !isFetched,
    error,
    search: setQuery,
  }
}

export default useSearch
