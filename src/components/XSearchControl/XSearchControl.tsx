import { SearchControl } from "../FormElements"
import { useSearchContext } from "../../contexts"
import { DEFAULT_SCALE } from "../../config"

const XSearchControl = () => {
  const { autoCompletions, search } = useSearchContext()

  const handleSubmit = (value: string) => {
    search(value)
  }

  return (
    <SearchControl
      id="x-search-control"
      autoFocus
      scale={DEFAULT_SCALE}
      autoCompletions={autoCompletions}
      onSubmit={handleSubmit}
    />
  )
}

export default XSearchControl
