import { useState, useEffect, useCallback, useRef } from "react"
import useHistoryAutocompletions from "./useHistoryAutocompletions"
import { areNotCaseInsensitiveEqual } from "../../../utils"
import { MAX_DISPLAYED_AUTOCOMPLETIONS } from "../../../config"
import type {
  SearchAutocompletion,
  HistoryAutocompletion,
  FetchedAutocompletion,
} from "../types"
import { basicToSearchAutocompletion } from "../helpers/convertToAutocompletion"
import { isEqual } from "lodash-es"

type useAutocomplete = {
  input: string
  contextQuery: string
  fetchedAutocompletions: FetchedAutocompletion[]
}

export default function useAutocomplete({
  input,
  contextQuery,
  fetchedAutocompletions,
}: useAutocomplete) {
  const [searchAutocompletions, setSearchAutocompletions] = useState<
    SearchAutocompletion[]
  >([])
  const { historyAutocompletions } = useHistoryAutocompletions(contextQuery)
  const [autocompletions, setAutocompletions] = useState<
    (SearchAutocompletion | HistoryAutocompletion)[]
  >([])
  const previousFetchedAutocompletions = useRef<FetchedAutocompletion[]>([])

  const effectSetAutocompletions = useCallback(() => {
    const preparedHistoryAutocompletions = historyAutocompletions.filter(
      ({ search }) => areNotCaseInsensitiveEqual(search, contextQuery)
    )
    const preparedSearchAutocompletions = input
      ? searchAutocompletions.filter(({ search }) =>
          areNotCaseInsensitiveEqual(search, contextQuery)
        )
      : []

    setAutocompletions([
      ...preparedHistoryAutocompletions,
      ...preparedSearchAutocompletions,
    ])
  }, [input, contextQuery, historyAutocompletions, searchAutocompletions])

  useEffect(() => {
    if (isEqual(previousFetchedAutocompletions.current, fetchedAutocompletions))
      return

    setSearchAutocompletions(
      fetchedAutocompletions.map((item) => basicToSearchAutocompletion(item))
    )
    previousFetchedAutocompletions.current = fetchedAutocompletions
  }, [fetchedAutocompletions])

  useEffect(effectSetAutocompletions, [effectSetAutocompletions])

  return {
    autocompletions: autocompletions.slice(0, MAX_DISPLAYED_AUTOCOMPLETIONS),
  }
}
