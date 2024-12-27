import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"
import { fetchAutocompletions, buildAutocompletionsURL } from "../../../api"
import { BasicAutocompletion } from "../types"

type Data = { results: BasicAutocompletion[] }

const defaultData = {
  results: [],
}

export const useFetchAutocompletions = (query: string) => {
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
        } else {
          setData(defaultData)
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setFetched(true)
      }
    }

    fetchData()
  }, [debouncedQuery])

  useEffect(effectCachedFetchAutocompletions, [
    effectCachedFetchAutocompletions,
  ])

  return {
    data,
    error,
    isFetched,
  }
}
