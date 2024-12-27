import { useState, useEffect, useCallback, useDeferredValue } from "react"
import { some, filter, concat } from "lodash-es"
import type { KeyboardEvent } from "react"
import {
  convertToSearchAutocompletions,
  convertToHistoryAutocompletions,
  isNotLowerCaseEqual,
} from "../../../utils"
import { MAX_DISPLAYED_AUTOCOMPLETIONS } from "../../../config"
import type {
  BasicAutocompletion,
  SearchAutocompletion,
  HistoryAutocompletion,
} from "../types"
import { useFetchAutocompletions } from "./useFetchAutocompletions"

export const useAutocomplete = ({
  input,
  query,
}: {
  input: string
  query: string
}) => {
  const {
    data: fetchedAutocompletions,
    error,
    isFetched,
  } = useFetchAutocompletions(input)
  const [searchAutocompletions, setSearchAutocompletions] = useState<
    SearchAutocompletion[]
  >([])
  const [historyAutocompletions, setHistoryAutocompletions] = useState<
    HistoryAutocompletion[]
  >([])
  const [autocompletions, setAutocompletions] = useState<
    (SearchAutocompletion | HistoryAutocompletion)[]
  >([])

  const effectSetSearchAutocompletions = useCallback(() => {
    if (!isFetched) return

    const { results } = fetchedAutocompletions

    if (error || !results.length) {
      setSearchAutocompletions([])
    }

    setSearchAutocompletions(
      concat(
        convertToSearchAutocompletions<
          BasicAutocompletion,
          SearchAutocompletion
        >(results)
      )
    )
  }, [fetchedAutocompletions, isFetched, error])

  const effectSetHistoryAutocompletions = useCallback(() => {
    if (!query) return
    if (some(historyAutocompletions, { search: query })) return

    setHistoryAutocompletions((state) =>
      concat(
        convertToHistoryAutocompletions<string, HistoryAutocompletion>(
          [query],
          {
            onDelete: (_: KeyboardEvent<HTMLButtonElement>, id: string) => {
              setHistoryAutocompletions((state) =>
                filter(
                  state,
                  ({ id: historyAutocompletionID }) =>
                    id !== historyAutocompletionID
                )
              )
            },
          }
        ),
        state
      )
    )
  }, [query, historyAutocompletions])

  const effectSetAutocompletions = useCallback(() => {
    const preparedHistoryAutocompletions = filter(
      historyAutocompletions,
      ({ search }) => isNotLowerCaseEqual(search, query)
    )
    const preparedSearchAutocompletions = filter(
      searchAutocompletions,
      ({ search }) => isNotLowerCaseEqual(search, input)
    )

    setAutocompletions(() =>
      [preparedHistoryAutocompletions, preparedSearchAutocompletions].flat()
    )
  }, [input, query, historyAutocompletions, searchAutocompletions])

  const deferredAutocompletions = useDeferredValue(autocompletions)

  useEffect(effectSetSearchAutocompletions, [effectSetSearchAutocompletions])

  useEffect(effectSetHistoryAutocompletions, [effectSetHistoryAutocompletions])

  useEffect(effectSetAutocompletions, [effectSetAutocompletions])

  return {
    autocompletions: deferredAutocompletions.slice(
      0,
      MAX_DISPLAYED_AUTOCOMPLETIONS
    ),
  }
}
