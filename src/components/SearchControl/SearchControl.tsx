import type { FC } from "react"
import * as Styled from "./SearchControl.style"
import { useSearchContext } from "../../contexts"
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
    handleFocus,
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
          <Icon scale={scale}>
            <IconSearch />
          </Icon>
        </Styled.SearchLabel>
        <InputField
          id={id}
          ref={searchInputRef}
          value={input}
          scale={scale}
          // Note: type=search auto resets on press Esc
          type="text"
          name="search"
          onChange={handleChange}
          onFocus={handleFocus}
          onClick={handleFocus}
        />
        <Styled.SearchControlBar $scale={scale}>
          {input && (
            <Styled.ButtonResetSearch type="reset" onClick={handleReset}>
              <Icon scale={scale}>
                <IconClose />
              </Icon>
            </Styled.ButtonResetSearch>
          )}
        </Styled.SearchControlBar>
        <input type="submit" hidden />
      </form>
      {isSearchDropdownVisible && (
        <SearchDropdown
          scale={scale}
          items={autocompletions}
          onSelectAutocompletionItem={handleSelectAutocompletionItem}
        />
      )}
    </Styled.SearchControl>
  )
}
