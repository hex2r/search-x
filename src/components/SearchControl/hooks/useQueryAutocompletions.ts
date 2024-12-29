import { useDeferredValue } from "react"
import { buildAutocompletionsURL, fetchAutocompletions } from "../../../api"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@uidotdev/usehooks"
import { FetchedAutocompletion } from "../types"

export default function useQueryAutocompletions(input: string) {
  const debouncedInput = useDebounce(input, 500)
  const {
    data: fetchedAutocompletions,
    error,
    isPending,
  } = useQuery<FetchedAutocompletion[]>({
    queryKey: ["searchAutocompletions", debouncedInput],
    queryFn: () =>
      fetchAutocompletions({
        url: buildAutocompletionsURL(debouncedInput),
      }),
    enabled: !!debouncedInput,
  })

  return {
    fetchedAutocompletions,
    error,
    isPending,
  }
}
