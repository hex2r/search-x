import { useState, useEffect, useRef } from "react"
import { isEqual, uniqWith } from "lodash-es"
import useHistoryAutocompletions from "./useHistoryAutocompletions"
import {
  caseInsensitiveIncludes,
  areNotCaseInsensitiveEqual,
} from "../../../utils"
import {
  TOTAL_DISPLAYED_AUTOCOMPLETIONS,
  MAX_DISPLAYED_HISTORY_AUTOCOMPLETIONS,
} from "../../../config"
import type { SearchAutocompletion, HistoryAutocompletion } from "../types"

type useAutocomplete = {
  input: string
  contextQuery: string
  fetchedSearchAutocompletions: SearchAutocompletion[]
}

export default function useAutocomplete({
  input,
  contextQuery,
  fetchedSearchAutocompletions,
}: useAutocomplete) {
  const [searchAutocompletions, setSearchAutocompletions] = useState<
    SearchAutocompletion[]
  >([])
  const { historyAutocompletions } = useHistoryAutocompletions(contextQuery)
  const [autocompletions, setAutocompletions] = useState<
    (SearchAutocompletion | HistoryAutocompletion)[]
  >([])
  const previousFetched = useRef<SearchAutocompletion[]>([])
  const previousAutocompletions = useRef<
    (SearchAutocompletion | HistoryAutocompletion)[]
  >([])

  useEffect(() => {
    if (!fetchedSearchAutocompletions.length) return

    if (isEqual(previousFetched.current, fetchedSearchAutocompletions)) return

    setSearchAutocompletions((state) =>
      uniqWith([...state, ...fetchedSearchAutocompletions], isEqual)
    )

    previousFetched.current = fetchedSearchAutocompletions
  }, [fetchedSearchAutocompletions])

  useEffect(() => {
    const preparedHistoryAutocompletions = historyAutocompletions.filter(
      ({ search }) => areNotCaseInsensitiveEqual(search, contextQuery)
    )

    if (!input) {
      setAutocompletions(preparedHistoryAutocompletions)
      return
    }

    const preparedSearchAutocompletions = searchAutocompletions.filter(
      ({ search }) => caseInsensitiveIncludes(search, input)
    )

    const actualAutocompletions = [
      ...preparedHistoryAutocompletions.slice(
        0,
        MAX_DISPLAYED_HISTORY_AUTOCOMPLETIONS
      ),
      ...preparedSearchAutocompletions,
    ]

    // ?
    if (isEqual(actualAutocompletions, previousAutocompletions.current)) return

    setAutocompletions(actualAutocompletions)

    previousAutocompletions.current = actualAutocompletions
  }, [input, contextQuery, historyAutocompletions, searchAutocompletions])

  return {
    autocompletions: autocompletions.slice(0, TOTAL_DISPLAYED_AUTOCOMPLETIONS),
  }
}
