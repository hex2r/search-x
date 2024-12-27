import { PropsWithChildren, ReactNode } from "react"
import * as Styled from "./SearchPage.style"

const SearchPageTemplate = ({
  children,
  logo,
}: { logo: ReactNode } & PropsWithChildren) => {
  return (
    <Styled.SearchPage>
      <div>{logo}</div>
      {children}
    </Styled.SearchPage>
  )
}

export default SearchPageTemplate
