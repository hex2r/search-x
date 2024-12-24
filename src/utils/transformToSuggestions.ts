import type { Global } from "../config"

type TransformToSuggestions<T> = {
  suggestions: string[]
  type: Global.SupportedSearchSuggestions
  actions?: {
    [method: string]: (args: T) => void
  }
}

export const transformToSuggestions = <T, U>({
  suggestions,
  type,
  actions = {},
}: TransformToSuggestions<T>): U[] => {
  const transformed = suggestions.map((item) => {
    return {
      type,
      content: {
        id: `id-${item}`,
        search: item,
        ...actions,
      },
    }
  }, [])

  return transformed as U[]
}
