import { buildSearchResultsURL, fetchSearchResults } from "../../../api"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@uidotdev/usehooks"
import { SearchEntry } from "../types"

export default function useQuerySearchResults(contextQuery: string) {
  const debouncedContextQuery = useDebounce(contextQuery, 500)
  const {
    data: searchResults,
    error,
    isPending,
  } = useQuery<SearchEntry[]>({
    queryKey: ["searchResults", debouncedContextQuery],
    queryFn: () =>
      fetchSearchResults({
        url: buildSearchResultsURL(debouncedContextQuery),
      }),
    enabled: !!debouncedContextQuery,
  })

  return {
    searchResults: searchResults || [],
    error,
    isPending,
  }
}
