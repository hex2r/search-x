import { store } from "../../db/store"
import {
  SEARCH_QUERY_PARAM,
  ENDPOINT_AUTOCOMPLETIONS,
  ENDPOINT_SEARCH,
  RESPONSE_TIMEOUT,
} from "../config"
import { getAutocompletions, getSearchResults } from "./selectors"
import { SearchEntry } from "../components/ResultsList/types"
import { BasicAutocompletion } from "../components/SearchControl/types"

type FakeResponse<T> = Promise<{
  results: T[]
}>

const fakeAPIRequest = async <T>({
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
}): FakeResponse<BasicAutocompletion> => {
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

export const fetchSearchResults = async ({
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
