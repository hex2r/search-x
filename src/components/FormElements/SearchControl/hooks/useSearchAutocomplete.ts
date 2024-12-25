import { useState, useEffect, useRef } from "react"
import type {
  MouseEvent as ReactMouseEvent,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react"
import {
  MAX_DISPLAYED_SUGGESTIONS,
  KEYS,
  EMPTY_STRING,
} from "../../../../config"
// Todo: resolve this dependency
import type { Autocompletion } from "../../../../contexts/Search/types"

type UseSearchAutocompleteProps = {
  defaultValue: string
  suggestedAutocompletions: Autocompletion[]
  autoFocus: boolean
  onSearchSubmit: (
    e:
      | FormEvent<HTMLFormElement>
      | ReactMouseEvent<HTMLLIElement>
      | KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => void
}

const useSearchAutocomplete = ({
  defaultValue = EMPTY_STRING,
  suggestedAutocompletions,
  autoFocus = false,
  onSearchSubmit,
}: UseSearchAutocompleteProps) => {
  const searchControlRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isSearchDropdownVisible, setSearchDropdownVisible] = useState(false)
  const [input, setInput] = useState<string>(defaultValue)
  const [autocompletions, setAutocompletions] = useState(
    suggestedAutocompletions
  )

  const refreshSuggestions = (value: string) => {
    const filteredSuggestions = suggestedAutocompletions.filter((item) =>
      item.content.search
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase())
    )

    if (!filteredSuggestions.length) {
      setSearchDropdownVisible(false)
      return
    }

    setSearchDropdownVisible(true)
    setAutocompletions(filteredSuggestions)
  }

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
    refreshSuggestions(e.target.value)
  }

  const handleReset = () => {
    focusSearchInput()
    setInput(defaultValue)
    refreshSuggestions(defaultValue)
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearchSubmit(e, input)
    setSearchDropdownVisible(false)
  }

  const handleSelectAutocompletionItem = (
    e: ReactMouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => {
    focusSearchInput()
    setSearchDropdownVisible(false)
    setInput(searchQuery)
    onSearchSubmit(e, searchQuery)
  }

  const handleInputFocus = () => {
    refreshSuggestions(input)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchControlRef.current &&
        !searchControlRef?.current.contains(e.target as Node | null)
      ) {
        setSearchDropdownVisible(false)
      }
    }

    if (autoFocus) {
      focusSearchInput()
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchInputRef, isSearchDropdownVisible, autoFocus])

  return {
    input,
    searchInputRef,
    searchControlRef,
    isSearchDropdownVisible,
    autocompletions: autocompletions.slice(0, MAX_DISPLAYED_SUGGESTIONS),
    handleSelectAutocompletionItem,
    handleSearchSubmit,
    handleInputFocus,
    handleEscClose,
    handleChange,
    handleReset,
  }
}

export default useSearchAutocomplete
