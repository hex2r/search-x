import type { FC } from "react"
import * as Styled from "./Pagination.styled"

export type Pagination = {
  totalPages: number
  currentPage: number
  onSelect: (page: number) => void
}

export const Pagination: FC<Pagination> = ({
  totalPages = 1,
  currentPage,
  onSelect,
}) => {
  return (
    <Styled.Pagination aria-label="Pagination">
      <div>
        <Styled.PaginationControl
          disabled={currentPage === 1}
          onClick={() => onSelect(currentPage - 1)}
        >
          Previous
        </Styled.PaginationControl>
      </div>
      <Styled.PaginationList>
        {[...new Array(totalPages)].map((_, idx) => {
          return (
            <li key={`page-${idx}`}>
              <Styled.PaginationControl
                disabled={currentPage === idx + 1}
                onClick={() => onSelect(idx + 1)}
              >
                {idx + 1}
              </Styled.PaginationControl>
            </li>
          )
        })}
      </Styled.PaginationList>
      <div>
        <Styled.PaginationControl
          disabled={currentPage === totalPages}
          onClick={() => onSelect(currentPage + 1)}
        >
          Next
        </Styled.PaginationControl>
      </div>
    </Styled.Pagination>
  )
}
