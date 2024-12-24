import { useState, useEffect, useCallback } from "react"
import type {
  SearchItem,
  SuggestionEntity,
  SearchHistoryRecord,
} from "../types"
import { fakeSearchRequest, fakeSuggestionsRequest } from "../../../utils"
import { SUGGESTIONS_URL } from "../../../config"
import { omit } from "../../../utils"

const SEARCH_HISTORY = "searchHistory"

const parseLocalStorageJSON = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "null")
}

const useSearch = () => {
  const [query, setQuery] = useState(
    new URL(window.location.href).searchParams.get("query") || ""
  )
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [suggestions, setSuggestions] = useState<SuggestionEntity[]>([])

  const getSearchHistory = useCallback((): SearchHistoryRecord => {
    return parseLocalStorageJSON(SEARCH_HISTORY) || {}
  }, [])

  const storeSearchRecord = useCallback(
    (searchRecord: SearchHistoryRecord) => {
      if (
        query in getSearchHistory() ||
        !query.length ||
        !searchRecord[query].length
      ) {
        return
      }

      localStorage.setItem(
        SEARCH_HISTORY,
        JSON.stringify({
          ...getSearchHistory(),
          ...searchRecord,
        })
      )
    },
    [query, getSearchHistory]
  )

  const deleteSearchHistoryRecord = () => (recordKey: string) => {
    const searchHistory = getSearchHistory()

    console.log("delete", recordKey)

    if (query in searchHistory) {
      localStorage.setItem(
        SEARCH_HISTORY,
        JSON.stringify(omit<SearchHistoryRecord>(searchHistory, recordKey))
      )
    }
  }

  useEffect(() => {
    if (!query) return

    const url = new URL(window.location.href)

    if (!url.searchParams.has("query")) {
      url.searchParams.append("query", query)
    }

    if (url.searchParams.get("query") !== query) {
      url.searchParams.set("query", query)
    }

    history.pushState({}, "", url.href)

    setLoading(true)

    fakeSearchRequest<SearchItem>({ url: window.location.href })
      .then((data) => {
        setSearchResults(data.results)
        storeSearchRecord({ [query]: data.results })
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
  }, [query, storeSearchRecord])

  useEffect(() => {
    // Todo: implement logic for query suggestions depending on search query
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

  return {
    searchResults,
    suggestions,
    getSearchHistory,
    deleteSearchHistoryRecord,
    isLoading,
    error,
    query,
    search: setQuery,
  }
}

export default useSearch
