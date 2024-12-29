import { store } from "../../db/store"
import {
  SEARCH_QUERY_PARAM,
  ENDPOINT_AUTOCOMPLETIONS,
  ENDPOINT_SEARCH,
  RESPONSE_TIMEOUT,
  API_AUTOCOMPLETIONS_URL,
  API_SEARCH_URL,
} from "../config"
import { getAutocompletions, getSearchResults } from "./selectors"
import { SearchEntry } from "../components/ResultsList/types"
import type { FetchedAutocompletion } from "../components/SearchControl/types"

const fakeAPIRequest = async <T>({
  succeed = true,
  timeout = RESPONSE_TIMEOUT,
  callback,
}: {
  succeed?: boolean
  callback: () => T
  timeout?: number
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve(callback())
      } else {
        reject({ status: 500, message: `Internal Server Error!` })
      }
    }, timeout)
  })
}

export const fetchAutocompletions = async ({
  succeed = true,
  url,
  timeout = RESPONSE_TIMEOUT,
}: {
  succeed?: boolean
  url: string
  timeout?: number
}): Promise<FetchedAutocompletion[]> => {
  const objectURL = new URL(url)
  const endpoint = `/${objectURL.pathname.split("/")[1]}`
  const query = objectURL.searchParams.get(SEARCH_QUERY_PARAM)

  console.log("Request Autocompletions >>", url)

  if (!query || endpoint !== ENDPOINT_AUTOCOMPLETIONS) {
    return Promise.reject({ status: 400, message: `Bad request! ${url}` })
  }

  return fakeAPIRequest({
    succeed,
    timeout,
    callback: () => getAutocompletions(store.results, query),
  })
}

export const buildAutocompletionsURL = (queryParam: string) => {
  return `${API_AUTOCOMPLETIONS_URL}/?${SEARCH_QUERY_PARAM}=${encodeURIComponent(
    queryParam
  )}`
}

export const buildSearchResultsURL = (queryParam: string) => {
  return `${API_SEARCH_URL}/?${SEARCH_QUERY_PARAM}=${encodeURIComponent(
    queryParam
  )}`
}

export const fetchSearchResults = async ({
  succeed = true,
  url,
  timeout = RESPONSE_TIMEOUT,
}: {
  succeed?: boolean
  url: string
  timeout?: number
}): Promise<SearchEntry[]> => {
  const objectURL = new URL(url)
  const endpoint = `/${objectURL.pathname.split("/")[1]}`
  const query = objectURL.searchParams.get(SEARCH_QUERY_PARAM)

  console.log("Request Search Results >>", url)

  if (!query || endpoint !== ENDPOINT_SEARCH) {
    return Promise.reject({ status: 400, message: `Bad request! ${url}` })
  }

  return fakeAPIRequest({
    succeed,
    timeout,
    callback: () => getSearchResults(store.results, query),
  })
}
