import { PropsWithChildren } from "react"
import * as Styled from "./SearchPage.style"

const SearchPageTemplate = ({ children }: PropsWithChildren) => {
  return <Styled.SearchPage>{children}</Styled.SearchPage>
}

export default SearchPageTemplate
