import { useMemo } from "react"
import type { FC, FormEvent } from "react"
import * as Styled from "./SearchControl.style"
import { useThemeContext } from "../../../contexts/Theme"
import { DEFAULT_SCALE, EMPTY_STRING } from "../../../config"
import { SuggestionsDropdown } from "./SuggestionDropdown"
import { InputField } from "../InputField"
import { Icon } from "../../Icon"
import IconSearch from "../../../assets/search.svg?react"
import IconClose from "../../../assets/close.svg?react"
import useSearchAutocomplete from "./useSearchAutocomplete"
import type { AutoCompletion } from "../../../contexts/Search/types"
import type { Global } from "../../../config"

export type SearchControl = {
  id: string
  defaultValue?: string
  autoCompletions: AutoCompletion[]
  autoFocus: boolean
  onSubmit: (search: string) => void
} & Global.ScaleProperty

export const SearchControl: FC<SearchControl> = ({
  id,
  scale = DEFAULT_SCALE,
  defaultValue = EMPTY_STRING,
  autoCompletions,
  onSubmit,
  autoFocus = false,
}) => {
  const theme = useThemeContext()
  const {
    focusSearchInput,
    handleChange,
    handleEscClose,
    handleReset,
    isSuggestionsVisible,
    refreshSuggestions,
    searchControlRef,
    searchInputRef,
    searchValue,
    setSearchValue,
    setSuggestionsVisible,
    suggestions,
  } = useSearchAutocomplete({ autoCompletions, autoFocus, defaultValue })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.warn("SUBMIT SEARCH")
    onSubmit(searchValue)
    setSuggestionsVisible(false)
  }

  return (
    <Styled.SearchControl
      ref={searchControlRef}
      $scale={scale}
      $suggestionsVisible={isSuggestionsVisible}
      onKeyDown={handleEscClose}
    >
      <form onSubmit={handleSubmit}>
        <Styled.SearchLabel $scale={scale} htmlFor={id}>
          <Icon scale={scale} theme={theme}>
            <IconSearch />
          </Icon>
        </Styled.SearchLabel>
        <InputField
          ref={searchInputRef}
          id={id}
          name="search"
          scale={scale}
          type="search"
          value={searchValue}
          onChange={handleChange}
          onFocus={() => refreshSuggestions(searchValue)}
        />
        <Styled.SearchControlBar $scale={scale}>
          {searchValue && (
            <Styled.SearchControlReset type="reset" onClick={handleReset}>
              <Icon scale={scale} theme={theme}>
                <IconClose />
              </Icon>
            </Styled.SearchControlReset>
          )}
        </Styled.SearchControlBar>
        <input type="submit" hidden />
      </form>
      {isSuggestionsVisible && (
        <SuggestionsDropdown
          items={suggestions}
          theme={theme}
          scale={scale}
          onSelect={(value: string) => {
            setSearchValue(value)
            focusSearchInput()
            setSuggestionsVisible(false)
            onSubmit(value)
          }}
        />
      )}
    </Styled.SearchControl>
  )
}
