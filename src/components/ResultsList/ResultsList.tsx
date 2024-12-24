import { Typography } from "../Typography"
import * as Styled from "./ResultsList.style"
import { Link } from "../Link"
import { useThemeContext, useSearchContext } from "../../contexts"
import { ErrorBanner } from "../Error"
// import { Pagination } from "../Pagination"

const ResultsList = () => {
  const theme = useThemeContext()
  const { searchResults, isLoading, error } = useSearchContext()

  if (error) {
    return <ErrorBanner message={error.message} />
  }

  if (!searchResults?.length) {
    return <Typography tag="p">No results found</Typography>
  }

  if (isLoading) {
    return <Typography tag="p">Loading...</Typography>
  }

  return (
    <Styled.ResultsContainer>
      <Styled.ResultsList aria-label="Search Results List">
        {searchResults.map(({ id, title, description, url }) => (
          <Styled.ResultsListItem key={id}>
            <div>
              <Link
                href={url}
                target="_blank"
                theme={theme}
                cx={{ display: "inline-block" }}
              >
                <Typography tag="h3">{title}</Typography>
              </Link>
            </div>
            <Typography tag="p">{description}</Typography>
          </Styled.ResultsListItem>
        ))}
      </Styled.ResultsList>
      {/* <Pagination totalPages={total} currentPage={page} /> */}
    </Styled.ResultsContainer>
  )
}

export default ResultsList
