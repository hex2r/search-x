import { useState } from "react"
import { ITEMS_PER_PAGE } from "../../../config"

export const usePagination = (perPage: number = ITEMS_PER_PAGE) => {
  const [page, setPage] = useState(1)

  return {
    page,
    perPage,
    onSelectPage: setPage,
  }
}
