import { SEARCH_QUERY_PARAM } from "../../../config"

export const updateUrlQueryParameter = (inputQuery: string) => {
  const url = new URL(window.location.href)

  if (!url.searchParams.has(SEARCH_QUERY_PARAM)) {
    url.searchParams.append(SEARCH_QUERY_PARAM, inputQuery)
  }

  if (url.searchParams.get(SEARCH_QUERY_PARAM) !== inputQuery) {
    url.searchParams.set(SEARCH_QUERY_PARAM, inputQuery)
  }

  history.pushState({}, "", url.href)
}
