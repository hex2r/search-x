import { useEffect } from "react"
import type { FC, FormEvent, KeyboardEvent, MouseEvent } from "react"
import * as Styled from "./SearchControl.style"
import { useThemeContext } from "../../../contexts/Theme"
import { DEFAULT_SCALE, EMPTY_STRING } from "../../../config"
import { SearchDropdown } from "./SearchDropdown"
import { InputField } from "../InputField"
import { Icon } from "../../Icon"
import IconSearch from "../../../assets/search.svg?react"
import IconClose from "../../../assets/close.svg?react"
import useSearchAutocomplete from "./hooks/useSearchAutocomplete"
import type { Global } from "../../../config"
// Todo: this component should know nothing about the context, resolve this dependency
import type { Autocompletion } from "../../../contexts/Search/types"

export type SearchControl = {
  id: string
  defaultValue?: string
  autocompletions: Autocompletion[]
  autoFocus: boolean
  onSearchSubmit: (
    e:
      | FormEvent<HTMLFormElement>
      | MouseEvent<HTMLLIElement>
      | KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => void
} & Global.ScaleProperty

export const SearchControl: FC<SearchControl> = ({
  id,
  scale = DEFAULT_SCALE,
  defaultValue = EMPTY_STRING,
  autocompletions,
  onSearchSubmit,
  autoFocus = false,
}) => {
  const theme = useThemeContext()
  const {
    input,
    handleChange,
    handleEscClose,
    handleReset,
    isSearchDropdownVisible,
    searchControlRef,
    searchInputRef,
    handleSearchSubmit,
    handleInputFocus,
    handleSelectAutocompletionItem,
    autocompletions: filteredAutocompletions,
  } = useSearchAutocomplete({
    suggestedAutocompletions: autocompletions,
    autoFocus,
    defaultValue,
    onSearchSubmit,
  })

  useEffect(() => {
    console.log("> Render >> <SearchControl />")
  })

  return (
    <Styled.SearchControl
      ref={searchControlRef}
      $scale={scale}
      $isDropdownVisible={isSearchDropdownVisible}
      onKeyDown={handleEscClose}
    >
      <form onSubmit={handleSearchSubmit}>
        <Styled.SearchLabel $scale={scale} htmlFor={id}>
          <Icon scale={scale} theme={theme}>
            <IconSearch />
          </Icon>
        </Styled.SearchLabel>
        <InputField
          id={id}
          ref={searchInputRef}
          value={input}
          scale={scale}
          type="search"
          name="search"
          onChange={handleChange}
          onFocus={handleInputFocus}
        />
        <Styled.SearchControlBar $scale={scale}>
          {input && (
            <Styled.ButtonResetSearch type="reset" onClick={handleReset}>
              <Icon scale={scale} theme={theme}>
                <IconClose />
              </Icon>
            </Styled.ButtonResetSearch>
          )}
        </Styled.SearchControlBar>
        <input type="submit" hidden />
      </form>
      {isSearchDropdownVisible && (
        <SearchDropdown
          theme={theme}
          scale={scale}
          items={filteredAutocompletions}
          onSelectAutocompletionItem={handleSelectAutocompletionItem}
        />
      )}
    </Styled.SearchControl>
  )
}
