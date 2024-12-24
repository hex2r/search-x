export type Pagination = {
  totalPages: number
  currentPage: number
  onSelect: (page: number) => void
}
