import { KeyboardEvent, MouseEvent } from "react"
import { SEARCH_AUTOCOMPLETION_TYPES } from "../../../config"
import {
  HistoryAutocompletion,
  SearchAutocompletion,
  FetchedAutocompletion,
} from "../types"

export const basicToSearchAutocompletion = (
  item: FetchedAutocompletion
): SearchAutocompletion => {
  return {
    type: SEARCH_AUTOCOMPLETION_TYPES.DEFAULT,
    ...item,
  }
}

export const stringToHistoryAutocompletion = ({
  contextQuery,
  onDelete,
}: {
  contextQuery: string
  onDelete: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    search: string
  ) => void
}): HistoryAutocompletion => {
  return {
    type: SEARCH_AUTOCOMPLETION_TYPES.HISTORY,
    id: crypto.randomUUID().split("-")[4],
    search: contextQuery,
    onDelete,
  }
}
