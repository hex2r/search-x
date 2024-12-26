import type { MouseEvent, KeyboardEvent } from "react"

export type BasicAutocompletion = {
  id: string
  search: string
}

export type SearchAutocompletion = {
  type: "default"
} & BasicAutocompletion

export type HistoryAutocompletion = {
  type: "history"
  onDelete: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    search: string
  ) => void
} & BasicAutocompletion

export type Autocompletion = SearchAutocompletion | HistoryAutocompletion
