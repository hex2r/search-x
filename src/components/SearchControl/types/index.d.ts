import type { MouseEvent, KeyboardEvent } from "react"

export type FetchedAutocompletion = {
  id: string
  search: string
}

export type SearchAutocompletion = {
  type: "default"
} & FetchedAutocompletion

export type HistoryAutocompletion = {
  type: "history"
  onDelete: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    search: string
  ) => void
} & FetchedAutocompletion

export type Autocompletion = SearchAutocompletion | HistoryAutocompletion
