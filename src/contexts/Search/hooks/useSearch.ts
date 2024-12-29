import { useState } from "react"
import { SEARCH_QUERY_PARAM } from "../../../config"

const useSearch = () => {
  const [query, setQuery] = useState(
    decodeURIComponent(
      new URL(window.location.href).searchParams.get(SEARCH_QUERY_PARAM) || ""
    )
  )

  return {
    query,
    search: setQuery,
  }
}

export default useSearch
