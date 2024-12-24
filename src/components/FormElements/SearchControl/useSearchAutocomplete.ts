import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from "react"
import type { AutoCompletion } from "../../../contexts/Search/types"
import { MAX_DISPLAYED_SUGGESTIONS, KEYS, EMPTY_STRING } from "../../../config"

const useSearchAutocomplete = ({
  defaultValue = EMPTY_STRING,
  autoCompletions,
  autoFocus = false,
}: {
  defaultValue: string
  autoCompletions: AutoCompletion[]
  autoFocus: boolean
}) => {
  const searchControlRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false)
  const [searchValue, setSearchValue] = useState<string>(defaultValue)
  const [suggestions, setSuggestions] = useState(autoCompletions)

  const refreshSuggestions = (value: string) => {
    const filteredSuggestions = autoCompletions.filter((item) =>
      item.content.search
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase())
    )

    if (!filteredSuggestions.length) {
      setSuggestionsVisible(false)
      return
    }

    setSuggestionsVisible(true)
    setSuggestions(filteredSuggestions)
  }

  const focusSearchInput = () => {
    searchInputRef?.current?.focus()
  }

  const handleEscClose = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (e.key === KEYS.ESC) {
      focusSearchInput()
      setSuggestionsVisible(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setSearchValue(value)
    refreshSuggestions(value)
  }

  const handleReset = () => {
    focusSearchInput()
    setSearchValue(defaultValue)
    refreshSuggestions(defaultValue)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchControlRef.current &&
        !searchControlRef?.current.contains(e.target as Node | null)
      ) {
        setSuggestionsVisible(false)
      }
    }

    if (autoFocus) {
      focusSearchInput()
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchInputRef, isSuggestionsVisible, autoFocus])

  return {
    suggestions: suggestions.slice(0, MAX_DISPLAYED_SUGGESTIONS),
    searchControlRef,
    searchInputRef,
    isSuggestionsVisible,
    handleEscClose,
    handleChange,
    handleReset,
    searchValue,
    refreshSuggestions,
    setSuggestionsVisible,
    setSearchValue,
    focusSearchInput,
  }
}

export default useSearchAutocomplete
