import { useState, useEffect } from "react"
import { some, filter } from "lodash-es"
import { stringToHistoryAutocompletion } from "../helpers/convertToAutocompletion"
import { HistoryAutocompletion } from "../types"

export default function usePersistedAutocompletions(contextQuery: string) {
  const [historyAutocompletions, setHistoryAutocompletions] = useState<
    HistoryAutocompletion[]
  >([])

  useEffect(() => {
    if (!contextQuery) return
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
  }, [contextQuery, historyAutocompletions])

  return { historyAutocompletions }
}
