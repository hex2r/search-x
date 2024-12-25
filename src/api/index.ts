import { store } from "../../db/store"
import {
  SEARCH_QUERY_PARAM,
  ENDPOINT_AUTOCOMPLETIONS,
  ENDPOINT_SEARCH,
  RESPONSE_TIMEOUT,
} from "../config"
import { SearchEntry, BasicAutocompletion } from "../contexts/Search/types"
import { getAutocompletions, getSearchResults } from "./selectors"

type FakeResponse<T> = Promise<{
  results: T[]
}>

const fakeAPIRequest = <T>({
  succeed = true,
  timeout = RESPONSE_TIMEOUT,
  callback,
}: {
  succeed?: boolean
  callback: () => T[]
  timeout?: number
}): FakeResponse<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve({
          results: callback(),
        })
      } else {
        reject({ status: 500, message: `Bad request!` })
      }
    }, timeout)
  })
}

export const fetchAutocompletions = ({
  succeed = true,
  url,
  timeout = RESPONSE_TIMEOUT,
}: {
  succeed?: boolean
  url: string
  timeout?: number
}): FakeResponse<BasicAutocompletion> => {
  const objectURL = new URL(url)
  const endpoint = `/${objectURL.pathname.split("/")[1]}`
  const query = objectURL.searchParams.get(SEARCH_QUERY_PARAM)

  if (!query || endpoint !== ENDPOINT_AUTOCOMPLETIONS) {
    return Promise.reject({ status: 500, message: `Bad request! ${url}` })
  }

  return fakeAPIRequest({
    succeed,
    timeout,
    callback: () => getAutocompletions(store.results, query),
  })
}

export const fetchSearchResults = ({
  succeed = true,
  url,
  timeout = RESPONSE_TIMEOUT,
}: {
  succeed?: boolean
  url: string
  timeout?: number
}): FakeResponse<SearchEntry> => {
  const objectURL = new URL(url)
  const endpoint = `/${objectURL.pathname.split("/")[1]}`
  const query = objectURL.searchParams.get(SEARCH_QUERY_PARAM)

  if (!query || endpoint !== ENDPOINT_SEARCH) {
    return Promise.reject({ status: 500, message: `Bad request! ${url}` })
  }

  return fakeAPIRequest({
    succeed,
    timeout,
    callback: () => getSearchResults(store.results, query),
  })
}
