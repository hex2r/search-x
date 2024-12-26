import { useState, useEffect, useCallback } from "react"
import type { KeyboardEvent } from "react"
import { fetchAutocompletions } from "../../../api"
import {
  convertToSearchAutocompletions,
  convertToHistoryAutocompletions,
} from "../../../utils"
import {
  API_AUTOCOMPLETIONS_URL,
  MAX_DISPLAYED_SUGGESTIONS,
  SEARCH_QUERY_PARAM,
} from "../../../config"
import type {
  BasicAutocompletion,
  SearchAutocompletion,
  HistoryAutocompletion,
} from "../types"
import { useQuery } from "@tanstack/react-query"

export const useAutocomplete = ({
  input,
  query,
}: {
  input: string
  query: string
}) => {
  const [searchAutocompletions, setSearchAutocompletions] = useState<
    SearchAutocompletion[]
  >([])
  const [historyAutocompletions, setHistoryAutocompletions] = useState<
    HistoryAutocompletion[]
  >([])
  const [autocompletions, setAutocompletions] = useState<
    (SearchAutocompletion | HistoryAutocompletion)[]
  >([])
  const {
    data: fetchedAutocompletions,
    isPending: isFetching,
    error: isFetchingError,
  } = useQuery({
    queryKey: ["searchAutocompletions", input],
    // Todo: add debounce
    queryFn: () =>
      fetchAutocompletions({
        url: `${API_AUTOCOMPLETIONS_URL}/?${SEARCH_QUERY_PARAM}=${input}`,
      }),
    enabled: !!input,
  })

  // const deferredAutocompletions = useDeferredValue(autocompletions)

  const storeSearchAutocompletions = useCallback(() => {
    if (isFetching || !fetchedAutocompletions) return

    if (isFetchingError) {
      setSearchAutocompletions([])
    }

    setSearchAutocompletions(() => [
      ...convertToSearchAutocompletions<
        BasicAutocompletion,
        SearchAutocompletion
      >(fetchedAutocompletions?.results),
    ])
  }, [fetchedAutocompletions, isFetching, isFetchingError])

  const storeHistoryAutocompletion = useCallback(() => {
    if (!query) return
    if (historyAutocompletions.some((item) => item.search === query)) return

    setHistoryAutocompletions((prevState) => [
      ...convertToHistoryAutocompletions<string, HistoryAutocompletion>(
        [query],
        {
          onDelete: (_: KeyboardEvent<HTMLButtonElement>, id: string) => {
            setHistoryAutocompletions((prevState) =>
              prevState.filter(
                ({ id: historyAutocompletionID }) =>
                  id !== historyAutocompletionID
              )
            )
          },
        }
      ),
      ...prevState,
    ])
  }, [query, historyAutocompletions])

  const handleAutoCompletions = useCallback(() => {
    setAutocompletions(() => [
      ...historyAutocompletions.filter(
        ({ search }) => search.toLocaleLowerCase() !== query.toLocaleLowerCase()
      ),
      ...(input
        ? searchAutocompletions.filter(
            ({ search }) =>
              search.toLocaleLowerCase() !== input.toLocaleLowerCase()
          )
        : []),
    ])
  }, [input, query, historyAutocompletions, searchAutocompletions])

  useEffect(storeHistoryAutocompletion, [storeHistoryAutocompletion])

  useEffect(storeSearchAutocompletions, [storeSearchAutocompletions])

  useEffect(handleAutoCompletions, [handleAutoCompletions])

  return {
    autocompletions: autocompletions.slice(0, MAX_DISPLAYED_SUGGESTIONS),
  }
}
