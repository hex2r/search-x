import { useState, useEffect, useCallback } from "react"
import { fetchSearchResults } from "../../../api"
import { SEARCH_QUERY_PARAM, API_SEARCH_URL } from "../../../config"
import type { SearchEntry } from "../types"

const useSearch = () => {
  const [query, setQuery] = useState(
    new URL(window.location.href).searchParams.get(SEARCH_QUERY_PARAM) || ""
  )
  const [isFetched, setFetched] = useState(false)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState<SearchEntry[]>([])

  const storeSearchResults = useCallback(() => {
    setFetched(false)

    fetchSearchResults({
      url: `${API_SEARCH_URL}/?${SEARCH_QUERY_PARAM}=${query}`,
    })
      .then((data) => {
        setSearchResults(data.results)
        setFetched(true)
      })
      .catch((error) => {
        setFetched(true)
        setError(error)
      })
  }, [query, setFetched])

  const handleSearch = useCallback(() => {
    if (!query) return

    const url = new URL(window.location.href)

    if (!url.searchParams.has(SEARCH_QUERY_PARAM)) {
      url.searchParams.append(SEARCH_QUERY_PARAM, query)
    }

    if (url.searchParams.get(SEARCH_QUERY_PARAM) !== query) {
      url.searchParams.set(SEARCH_QUERY_PARAM, query)
    }

    history.pushState({}, "", url.href)

    storeSearchResults()
  }, [query, storeSearchResults])

  useEffect(handleSearch, [handleSearch])

  return {
    query,
    searchResults,
    isLoading: !isFetched,
    error,
    search: setQuery,
  }
}

export default useSearch
