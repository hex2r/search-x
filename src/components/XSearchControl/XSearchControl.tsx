import { FormEvent, MouseEvent, KeyboardEvent } from "react"
import { SearchControl } from "../FormElements"
import { useSearchContext } from "../../contexts"
import { DEFAULT_SCALE } from "../../config"

const XSearchControl = () => {
  const { autocompletions, search } = useSearchContext()

  const handleSubmit = (
    _:
      | MouseEvent<HTMLLIElement>
      | FormEvent<HTMLFormElement>
      | KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => {
    search(searchQuery)
  }

  return (
    <SearchControl
      id="x-search-control"
      autoFocus
      scale={DEFAULT_SCALE}
      autocompletions={autocompletions}
      onSearchSubmit={handleSubmit}
    />
  )
}

export default XSearchControl
