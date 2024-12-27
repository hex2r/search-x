import { useQuery } from "@tanstack/react-query"
import { useSearchContext } from "../../contexts"
import { Typography } from "../Typography"
import * as Styled from "./ResultsList.style"
import { Link } from "../Link"
import { ErrorBanner } from "../Error"

import { fetchSearchResults } from "../../api"
import {
  SEARCH_QUERY_PARAM,
  API_SEARCH_URL,
  RESPONSE_TIMEOUT,
} from "../../config"

const ResultsList = () => {
  const { query } = useSearchContext()
  const { error, data, isPending } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: async () =>
      fetchSearchResults({
        url: `${API_SEARCH_URL}/?${SEARCH_QUERY_PARAM}=${query}`,
      }),
    enabled: !!query,
  })

  const renderMeta = (totalResults: number, responseTimeout: number) =>
    `${totalResults} results found (${responseTimeout} seconds)`

  if (!query) return null

  if (error) {
    return <ErrorBanner name={error.name} message={error.message} />
  }

  if (isPending) {
    return <Typography tag="p">Loading...</Typography>
  }

  if (!data?.results.length) {
    return <Typography tag="p">No results found</Typography>
  }

  return (
    <Styled.ResultsContainer>
      <Styled.ResultsMetaBar>
        <Typography tag="p">
          {renderMeta(data.results.length, RESPONSE_TIMEOUT / 1000)}
        </Typography>
      </Styled.ResultsMetaBar>
      <Styled.ResultsList aria-label="Search Results List">
        {data?.results.map(({ id, title, description, url }) => (
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

export default ResultsList
