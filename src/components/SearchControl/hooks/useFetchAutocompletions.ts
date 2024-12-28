import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"
import { fetchAutocompletions, buildAutocompletionsURL } from "../../../api"
import { BasicAutocompletion } from "../types"
import { useLocalCache } from "./useCache"

type Data = { results: BasicAutocompletion[] }

const defaultData = {
  results: [],
}

export const useFetchAutocompletions = (query: string) => {
  const { setCache, getFromCache, isExistsInCache } =
    useLocalCache("autocompletions")
  const [data, setData] = useState<Data>(defaultData)
  const [error, setError] = useState<Error | null>(null)
  const [isFetched, setFetched] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  const effectCachedFetchAutocompletions = useCallback(() => {
    if (!debouncedQuery) return

    async function fetchData() {
      setFetched(false)

      try {
        const data = await fetchAutocompletions({
          url: buildAutocompletionsURL(debouncedQuery),
        })

        if (data.results.length) {
          setData(data)
          setCache(debouncedQuery, data)
        } else {
          setData(defaultData)
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setFetched(true)
      }
    }

    if (isExistsInCache(debouncedQuery)) {
      setData(getFromCache<Data>(debouncedQuery))
    } else {
      fetchData()
    }
  }, [debouncedQuery, setCache, isExistsInCache, getFromCache])

  useEffect(effectCachedFetchAutocompletions, [
    effectCachedFetchAutocompletions,
  ])

  return {
    data,
    error,
    isFetched,
  }
}
