import { KeyboardEvent } from "react"
import { SEARCH_AUTOCOMPLETION_TYPES } from "../config"

export const convertToSearchAutocompletions = <T, U>(items: T[]): U[] => {
  const transformed = items.map((item) => ({
    type: SEARCH_AUTOCOMPLETION_TYPES.SEARCH,
    ...item,
  })) as unknown[]

  return transformed as U[]
}

export const convertToHistoryAutocompletions = <T, U>(
  items: T[],
  actions: {
    [method: string]: (e: KeyboardEvent<HTMLButtonElement>, val: string) => void
  } = {}
): U[] => {
  const transformed = items.map((item) => ({
    type: SEARCH_AUTOCOMPLETION_TYPES.HISTORY,
    id: `id-${item}`,
    search: item,
    ...actions,
  })) as unknown[]

  return transformed as U[]
}
