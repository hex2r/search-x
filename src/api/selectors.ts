import { SearchEntry } from "../components/ResultsList/types"
import type { BasicAutocompletion } from "../components/SearchControl/types"

import { includesString } from "../utils"

const autoSuggestionsCache: { [query: string]: BasicAutocompletion[] } = {}

export const getAutocompletions = (
  data: SearchEntry[],
  query: string
): BasicAutocompletion[] => {
  if (query in autoSuggestionsCache) {
    return autoSuggestionsCache[query]
  }

  const results = data.reduce<unknown[]>((acc, curr) => {
    if (includesString(curr.title, query)) {
      return [
        ...acc,
        {
          id: curr.id,
          search: curr.title,
        },
      ]
    }
    return acc
  }, []) as BasicAutocompletion[]

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
      includesString(curr.title, query) ||
      includesString(curr.description, query)
    ) {
      return [...acc, curr]
    }

    return acc as BasicAutocompletion[]
  }, []) as SearchEntry[]

  if (results.length) {
    searchResultsCache[query] = [...results]
  }

  return results
}
