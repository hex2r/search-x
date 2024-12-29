import { caseInsensitiveIncludes } from "../utils"
import type { SearchEntry } from "../components/ResultsList/types"
import type { FetchedAutocompletion } from "../components/SearchControl/types"

const autoSuggestionsCache: { [query: string]: FetchedAutocompletion[] } = {}

export const getAutocompletions = (
  data: SearchEntry[],
  query: string
): FetchedAutocompletion[] => {
  if (query in autoSuggestionsCache) {
    return autoSuggestionsCache[query]
  }

  const results = data.reduce<unknown[]>((acc, curr) => {
    if (caseInsensitiveIncludes(curr.title, query)) {
      return [
        ...acc,
        {
          id: curr.id,
          search: curr.title,
        },
      ]
    }
    return acc
  }, []) as FetchedAutocompletion[]

  if (results.length) {
    autoSuggestionsCache[query] = [...results]
  }

  return results
}

const searchResultsCache: { [query: string]: SearchEntry[] } = {}

export const getSearchResults = (
  data: SearchEntry[],
  query: string
): SearchEntry[] => {
  if (query in searchResultsCache) {
    return searchResultsCache[query]
  }

  const results = data.reduce<unknown[]>((acc, curr) => {
    if (
      caseInsensitiveIncludes(curr.title, query) ||
      caseInsensitiveIncludes(curr.description, query)
    ) {
      return [...acc, curr]
    }

    return acc as FetchedAutocompletion[]
  }, []) as SearchEntry[]

  if (results.length) {
    searchResultsCache[query] = [...results]
  }

  return results
}
