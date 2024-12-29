import { useSearchContext } from "../../contexts"
import { Typography } from "../Typography"
import * as Styled from "./ResultsList.style"
import { Link } from "../Link"
import useQuerySearchResults from "./hooks/useQuerySearchResults"
import { RESPONSE_TIMEOUT } from "../../config"
import { getMeta } from "./helpers/getMeta"

export default function ResultsList() {
  const { query } = useSearchContext()
  const { searchResults, isPending, error } = useQuerySearchResults(query)

  if (!query) return null

  if (error) throw error

  if (isPending) {
    return <Typography tag="p">Loading...</Typography>
  }

  if (!searchResults.length) {
    return <Typography tag="p">No results found</Typography>
  }

  return (
    <Styled.ResultsContainer>
      <Styled.ResultsMetaBar>
        <Typography tag="p">
          {getMeta(searchResults.length, RESPONSE_TIMEOUT / 1000)}
        </Typography>
      </Styled.ResultsMetaBar>
      <Styled.ResultsList aria-label="Search Results List">
        {searchResults!.map(({ id, title, description, url }) => (
          <Styled.ResultsListItem key={id}>
            <div>
              <Link href={url} target="_blank" cx={{ display: "inline-block" }}>
                <Typography tag="h3">{title}</Typography>
              </Link>
            </div>
            <Typography tag="p">{description}</Typography>
          </Styled.ResultsListItem>
        ))}
      </Styled.ResultsList>
    </Styled.ResultsContainer>
  )
}
