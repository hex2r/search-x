import { useState, useRef } from "react"
import type {
  MouseEvent as ReactMouseEvent,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react"
import { KEYS } from "../../../config"
import { updateUrlQueryParameter } from "../helpers/updateUrlSearchParameter"

type UseSearchControl = {
  defaultValue?: string
  autoFocus: boolean
  contextQuery: string
  search: Dispatch<SetStateAction<string>>
}

export default function useSearchControl({
  search,
  contextQuery,
  defaultValue = "",
}: UseSearchControl) {
  const searchControlRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState<string>(contextQuery || defaultValue)
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const focusSearchInput = () => {
    searchInputRef?.current?.focus()
  }

  const onPressEsc = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (e.key === KEYS.ESC) {
      focusSearchInput()
      setDropdownVisible(false)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const onReset = () => {
    setInput(contextQuery || defaultValue)
    focusSearchInput()
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim() || input === contextQuery) return
    updateUrlQueryParameter(input)

    search(input.trim())
    setDropdownVisible(false)
  }

  const onSelectAutocompletion = (
    _: ReactMouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => {
    focusSearchInput()
    updateUrlQueryParameter(searchQuery)
    setInput(searchQuery)
    search(searchQuery)
    setDropdownVisible(false)
  }

  return {
    input,
    searchInputRef,
    searchControlRef,
    isDropdownVisible,
    setDropdownVisible,
    onSelectAutocompletion,
    onSubmit,
    onPressEsc,
    onChange,
    onReset,
  }
}
