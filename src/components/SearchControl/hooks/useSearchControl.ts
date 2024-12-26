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
    if (!e.target.value.trim() || autocompletions.length === 0) {
      setSearchDropdownVisible(false)
    } else {
      setSearchDropdownVisible(true)
    }

    setInput(e.target.value)
  }

  const handleReset = () => {
    setInput("")
    focusSearchInput()
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim() || input === contextQuery) return

    const url = new URL(window.location.href)

    if (!url.searchParams.has(SEARCH_QUERY_PARAM)) {
      url.searchParams.append(SEARCH_QUERY_PARAM, input)
    }

    if (url.searchParams.get(SEARCH_QUERY_PARAM) !== input) {
      url.searchParams.set(SEARCH_QUERY_PARAM, input)
    }

    history.pushState({}, "", url.href)

    search(input.trim())
    setSearchDropdownVisible(false)
  }

  const handleSelectAutocompletionItem = (
    _: ReactMouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => {
    focusSearchInput()
    setInput(searchQuery)
    search(searchQuery)
    setSearchDropdownVisible(false)
  }

  const handleFocus = useCallback(() => {
    if (autocompletions.length > 0) {
      setSearchDropdownVisible(true)
    }
  }, [autocompletions])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target

      if (
        target instanceof HTMLElement &&
        searchControlRef.current &&
        !searchControlRef.current.contains(target)
      ) {
        setSearchDropdownVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchControlRef])

  const effectAutofocus = useCallback(() => {
    if (autoFocus) {
      focusSearchInput()
    }
  }, [autoFocus])

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
    handleFocus,
  }
}
