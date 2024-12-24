import { data } from "../../db/data"

// suggestions support only search by title, decompose
const decomposeDataToSuggestionsData = () => {
  return data.results.reduce<unknown[]>(
    (acc, curr) => [
      ...acc,
      {
        id: curr.id,
        search: curr.title,
      },
    ],
    []
  )
}

type FakeSuggestionsRequest = {
  succeed?: boolean
  url: string
  timeout?: number
}

type FakeResponse<T> = Promise<{
  results: T[]
}>

export const fakeSuggestionsRequest = <T>({
  succeed = true,
  url,
  timeout = 500,
}: FakeSuggestionsRequest): FakeResponse<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve({
          results: decomposeDataToSuggestionsData() as T[],
        })
      } else {
        reject({ message: `Bad request ${url}` })
      }
    }, timeout)
  })
}
