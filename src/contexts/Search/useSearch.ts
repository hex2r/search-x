import { useState, useEffect } from "react"
import type { SearchItem } from "./types"
import { fakeSearchRequest } from "../../utils"

const useSearch = () => {
  const [query, setQuery] = useState(
    new URL(window.location.href).searchParams.get("query") || ""
  )
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])

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

    fakeSearchRequest<SearchItem>({ url: window.location.href, timeout: 0 })
      .then((data) => {
        setSearchResults(data.results)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
  }, [query])

  return { searchResults, isLoading, error, search: setQuery }
}

export default useSearch
