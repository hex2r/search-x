import { useState, useEffect, useRef } from "react"
import { some, filter } from "lodash-es"
import { stringToHistoryAutocompletion } from "../helpers/convertToAutocompletion"
import { HistoryAutocompletion } from "../types"

export default function usePersistedAutocompletions(contextQuery: string) {
  const [historyAutocompletions, setHistoryAutocompletions] = useState<
    HistoryAutocompletion[]
  >([])
  const previousQuery = useRef<string | null>(null)

  useEffect(() => {
    if (!contextQuery) return
    if (contextQuery === previousQuery.current) return
    if (some(historyAutocompletions, { search: contextQuery })) return

    setHistoryAutocompletions((state) => [
      stringToHistoryAutocompletion({
        contextQuery,
        onDelete: (_, id) => {
          setHistoryAutocompletions((state) =>
            filter(
              state,
              ({ id: historyAutocompletionID }) =>
                id !== historyAutocompletionID
            )
          )
        },
      }),
      ...state,
    ])

    previousQuery.current = contextQuery
  }, [contextQuery, historyAutocompletions])

  return { historyAutocompletions }
}
