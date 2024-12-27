import styled from "@emotion/styled"

export const Pagination = styled.div`
  display: flex;
  gap: 1rem;
  align-self: center;
`

export const PaginationList = styled.div`
  list-style: none;
  display: flex;
  gap: 0.25rem;
`

export const PaginationControl = styled.button<{
  $active?: boolean
  $hidden?: boolean
}>`
  border: none;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  text-decoration: none;
  background: none;

  ${(props) => props.$hidden && `visibility: hidden;`}
  ${(props) =>
    props.$active
      ? `color: #444;`
      : `
    color: #4285f4;

    &:not(:disabled):hover {
      text-decoration: underline;
    }`}

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    color: #444;
  }
`
