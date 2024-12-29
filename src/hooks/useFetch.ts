import { useCallback, useEffect, useState, useRef } from "react"
import { isEqual } from "lodash-es"

type FetchCache<T> = {
  [key: string]: T
}

export const useFetch = <T>({
  fetchFn,
  dependencies,
  enabled = true,
}: {
  fetchFn: () => Promise<T> | undefined
  dependencies: readonly unknown[]
  enabled?: boolean
  debounceTime?: number
}) => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [isPending, setPending] = useState(false)
  const cache = useRef<FetchCache<T> | undefined>(undefined)

  const callbackFetchFn = useCallback(fetchFn, [fetchFn])

  useEffect(() => {
    if (!enabled) return

    if (cache.current && !isPending) {
      const JSONDependencies = JSON.stringify(dependencies)

      if (isEqual(cache.current[JSONDependencies], data)) {
        return
      }

      if (JSONDependencies in cache.current) {
        setData(cache.current[JSONDependencies])
        return
      }

      setPending(true)
    }

    const fetchData = async function () {
      try {
        const results = (await callbackFetchFn()) as T

        setData(results)

        if (!cache.current) {
          cache.current = {}
          cache.current[JSON.stringify(dependencies)] = results
        } else {
          cache.current[JSON.stringify(dependencies)] = results
        }
      } catch (err: unknown) {
        setError(err as Error)
      } finally {
        setPending(false)
      }
    }

    fetchData()
  }, [data, enabled, isPending, callbackFetchFn, dependencies])

  return {
    data,
    error,
    isPending,
  }
}
