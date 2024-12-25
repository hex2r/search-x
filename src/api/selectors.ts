import { SEARCH_AUTOCOMPLETION_TYPES } from "../config"
import { BasicAutocompletion, SearchEntry } from "../contexts/Search/types"
import { includesString } from "../utils"

export const getAutocompletions = (
  data: SearchEntry[],
  query: string
): BasicAutocompletion[] => {
  return data.reduce<unknown[]>((acc, curr) => {
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
}

export const getSearchResults = (
  data: SearchEntry[],
  query: string
): SearchEntry[] => {
  return data.reduce<unknown[]>((acc, curr) => {
    if (
      includesString(curr.title, query) ||
      includesString(curr.description, query)
    ) {
      return [...acc, curr]
    }

    return acc
  }, []) as SearchEntry[]
}
