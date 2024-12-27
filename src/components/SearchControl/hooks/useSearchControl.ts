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
import { useAutocomplete } from "./useAutocomplete"
import { updateUrlQueryParameter } from "../helpers/updateUrlSearchParameter"

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
    if (!e.target.value.trim() || !autocompletions.length) {
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
    updateUrlQueryParameter(input)

    search(input.trim())
    setSearchDropdownVisible(false)
  }

  const handleSelectAutocompletionItem = (
    _: ReactMouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => {
    focusSearchInput()
    updateUrlQueryParameter(searchQuery)
    setInput(searchQuery)
    search(searchQuery)
    setSearchDropdownVisible(false)
  }

  const handleFocus = useCallback(() => {
    if (autocompletions.length) {
      setSearchDropdownVisible(true)
    }
  }, [autocompletions])

  const effectAutofocus = useCallback(() => {
    if (input) return

    if (autoFocus) {
      focusSearchInput()
    }
  }, [input, autoFocus])

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

  useEffect(effectAutofocus, [effectAutofocus])

  useEffect(() => {
    if (!autocompletions.length) {
      setSearchDropdownVisible(false)
    }
  }, [autocompletions])

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
