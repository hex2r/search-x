import { SEARCH_QUERY_PARAM } from "../../../config"

// Todo: improve this function to pass all the searchParams
export const updateUrlQueryParameter = (inputQuery: string) => {
  const encodedQuery = inputQuery
  const url = new URL(window.location.href)

  if (!url.searchParams.has(SEARCH_QUERY_PARAM)) {
    url.searchParams.append(SEARCH_QUERY_PARAM, encodedQuery)
  }

  if (url.searchParams.get(SEARCH_QUERY_PARAM) !== encodedQuery) {
    url.searchParams.set(SEARCH_QUERY_PARAM, encodedQuery)
  }

  history.pushState({}, "", url.href)
}
