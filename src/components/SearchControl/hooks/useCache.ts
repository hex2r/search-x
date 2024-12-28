import { useRef, useCallback } from "react"
import { isEqual } from "lodash-es"

type Cache = {
  [cacheId: string]: {
    [key: string]: string
  }
}

// Store cache Locally in format:
// [cacheId]: {
//   "g|goo|googl|google|":
//     '[{id: 1, search: "Google inc.", type: "search"}]',
// }

export const useLocalCache = (cacheId: string) => {
  const cache = useRef<Cache>({
    [cacheId]: {},
  })

  const isExistsInCache = useCallback(
    (key: string) => {
      const cacheKeys = Object.keys(cache.current[cacheId]).join("")

      return cacheKeys.includes(key)
    },
    [cacheId]
  )

  const hasValue = useCallback(
    <T>(value: T): string | undefined => {
      const results = Object.entries(cache.current[cacheId]).reduce<string[]>(
        (acc, [cacheKey, cacheValue]) => {
          if (isEqual(value, JSON.parse(cacheValue))) {
            return [...acc, cacheKey]
          }

          return acc
        },
        []
      )

      return results.length ? results[0] : undefined
    },
    [cacheId]
  )

  const getFromCache = useCallback(
    <T>(key: string): T => {
      const results = Object.keys(cache.current[cacheId]).reduce<T[]>(
        (acc, cacheKey) => {
          if (cacheKey.includes(key)) {
            return [...acc, JSON.parse(cache.current[cacheId][cacheKey])]
          }

          return acc
        },
        []
      )

      return results[0]
    },
    [cacheId]
  )

  const setCache = useCallback(
    <T extends object>(key: string, value: T | Array<T>) => {
      if (isExistsInCache(key)) {
        return false
      }

      const cacheValueKey = hasValue(value)

      if (cacheValueKey) {
        cache.current[cacheId] = {
          ...cache.current[cacheId],
          [`${cacheValueKey}${key}|`]: JSON.stringify(value),
        }

        delete cache.current[cacheId][cacheValueKey]

        return true
      }

      cache.current[cacheId] = {
        ...cache.current[cacheId],
        [`${key}|`]: JSON.stringify(value),
      }

      return true
    },
    [cacheId, isExistsInCache, hasValue]
  )

  return { getFromCache, setCache, isExistsInCache }
}
