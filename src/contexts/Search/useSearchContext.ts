import { useContext } from "react"
import SearchContext from "./SearchContext"

const useSearchContext = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error(
      "The following component should be used within SearchContext"
    )
  }

  return context
}

export default useSearchContext
