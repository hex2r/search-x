import { data as fakeData } from "../../db/data"

type FakeSearchRequest = {
  url: string
  timeout?: number
}

type FakeResponse<T> = Promise<{
  results: T[]
}>

export const fakeSearchRequest = <T>({
  url,
  timeout = 500,
}: FakeSearchRequest): FakeResponse<T> => {
  const urlParams = new URL(url)
  const query = urlParams.searchParams.get("query") || ""
  const encodedQuery = decodeURIComponent(query)
  const results = fakeData.results.filter(
    ({ title, description }) =>
      title.toLocaleLowerCase().includes(encodedQuery.toLowerCase()) ||
      description.toLocaleLowerCase().includes(encodedQuery.toLowerCase())
  ) as T[]

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (query?.length) {
        resolve({
          results,
        })
      } else {
        reject({ message: `Bad request ${url}` })
      }
    }, timeout)
  })
}
