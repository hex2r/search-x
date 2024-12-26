import { useState, useEffect, useRef, useCallback } from "react"
import type {
  MouseEvent as ReactMouseEvent,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react"
import { KEYS } from "../../../config"
import { SEARCH_QUERY_PARAM } from "../../../config"
import { useAutocomplete } from "./useAutocomplete"

type UseSearchControl = {
  autoFocus: boolean
  contextQuery: string
  search: Dispatch<SetStateAction<string>>
}

export const useSearchControl = ({
  autoFocus = false,
  search,
  contextQuery,
}: UseSearchControl) => {
  const searchControlRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isSearchDropdownVisible, setSearchDropdownVisible] = useState(false)
  const [input, setInput] = useState<string>(contextQuery)
  const { autocompletions } = useAutocomplete({ input, query: contextQuery })

  const focusSearchInput = () => {
    searchInputRef?.current?.focus()
  }

  const handleEscClose = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (e.key === KEYS.ESC) {
      focusSearchInput()
      setSearchDropdownVisible(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleReset = () => {
    setInput("")
    focusSearchInput()
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input) return
    if (input === contextQuery) return

    const url = new URL(window.location.href)

    if (!url.searchParams.has(SEARCH_QUERY_PARAM)) {
      url.searchParams.append(SEARCH_QUERY_PARAM, input)
    }

    if (url.searchParams.get(SEARCH_QUERY_PARAM) !== input) {
      url.searchParams.set(SEARCH_QUERY_PARAM, input)
    }

    history.pushState({}, "", url.href)

    search(input)
    setSearchDropdownVisible(false)
  }

  const handleSelectAutocompletionItem = (
    _: ReactMouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => {
    setSearchDropdownVisible(false)
    focusSearchInput()
    setInput(searchQuery)
    search(searchQuery)
  }

  const effectDropdownVisibility = useCallback(() => {
    console.log(autocompletions)
    if (autocompletions.length) {
      setSearchDropdownVisible(true)
      return
    }
    setSearchDropdownVisible(false)
  }, [autocompletions])

  const effectAutofocus = useCallback(() => {
    if (autoFocus) {
      focusSearchInput()
    }
  }, [autoFocus])

  useEffect(effectDropdownVisibility, [effectDropdownVisibility])
  useEffect(effectAutofocus, [effectAutofocus])

  return {
    input,
    autocompletions,
    searchInputRef,
    searchControlRef,
    isSearchDropdownVisible,
    handleSelectAutocompletionItem,
    handleSearchSubmit,
    handleEscClose,
    handleChange,
    handleReset,
  }
}
