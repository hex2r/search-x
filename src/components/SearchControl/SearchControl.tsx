import type { FC } from "react"
import * as Styled from "./SearchControl.style"
import { useThemeContext, useSearchContext } from "../../contexts"
import { DEFAULT_SCALE } from "../../config"
import { SearchDropdown } from "./SearchDropdown"
import { InputField } from "../InputField"
import { Icon } from "../Icon"
import IconSearch from "../../assets/search.svg?react"
import IconClose from "../../assets/close.svg?react"
import type { Global } from "../../config/types/"
import { useSearchControl } from "./hooks/useSearchControl"

export type SearchControl = {
  id: string
  autoFocus?: boolean
  scale?: Global.Scale
}

export const SearchControl: FC<SearchControl> = ({
  id,
  scale = DEFAULT_SCALE,
  autoFocus = false,
}) => {
  const theme = useThemeContext()
  const { query, search } = useSearchContext()
  const {
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
  } = useSearchControl({
    autoFocus,
    search,
    contextQuery: query,
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
          type="text"
          name="search"
          onChange={handleChange}
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
      {/* {autocompletions.length > 0 && ( */}
      {isSearchDropdownVisible && (
        <SearchDropdown
          theme={theme}
          scale={scale}
          items={autocompletions}
          onSelectAutocompletionItem={handleSelectAutocompletionItem}
        />
      )}
    </Styled.SearchControl>
  )
}
