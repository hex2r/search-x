import { SearchControl } from "../FormElements"
import { useSearchContext, useSuggestionsContext } from "../../contexts"
import { DEFAULT_SCALE } from "../../config"

const XSearchControl = () => {
  const suggestions = useSuggestionsContext()
  const { search } = useSearchContext()

  const handleSubmit = (value: string) => {
    search(value)
  }

  return (
    <SearchControl
      id="x-search-control"
      autoFocus
      scale={DEFAULT_SCALE}
      autocomplete={suggestions}
      onSubmit={handleSubmit}
    />
  )
}

export default XSearchControl
