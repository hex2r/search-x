import { memo, useEffect, useDeferredValue } from "react"
import type { FC } from "react"
// import { useForm } from "react-hook-form"
import * as Styled from "./SearchControl.style"
import { useSearchContext } from "../../contexts"
import { DEFAULT_SCALE } from "../../config"
import SearchDropdown from "./SearchDropdown"
import { InputField } from "../InputField"
import { Icon } from "../Icon"
import IconSearch from "../../assets/search.svg?react"
import IconClose from "../../assets/close.svg?react"
import type { Global } from "../../config/types/"
import useSearchControl from "./hooks/useSearchControl"
import useQueryAutocompletions from "./hooks/useQueryAutocompletions"
import useAutocomplete from "./hooks/useAutocomplete"
import useEffectOutsideClick from "../../hooks/useOutsideClick"
import { basicToSearchAutocompletion } from "./helpers/convertToAutocompletion"

export type SearchControl = {
  id: string
  autoFocus?: boolean
  scale?: Global.Scale
}

const SearchControl: FC<SearchControl> = ({
  id,
  scale = DEFAULT_SCALE,
  autoFocus = false,
}) => {
  const { query, search } = useSearchContext()
  const {
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
  } = useSearchControl({
    autoFocus,
    search,
    contextQuery: query,
  })
  const {
    fetchedAutocompletions,
    error: fetchError,
    isPending,
  } = useQueryAutocompletions(input)
  const { autocompletions } = useAutocomplete({
    input,
    contextQuery: query,
    fetchedSearchAutocompletions:
      fetchError || isPending
        ? []
        : fetchedAutocompletions.map((item) =>
            basicToSearchAutocompletion(item)
          ),
  })

  // const deferredAutocompletions = useDeferredValue(autocompletions)

  const handleDropdown = () => {
    if (autocompletions.length) {
      setDropdownVisible(true)
      return
    }
    setDropdownVisible(false)
  }

  useEffectOutsideClick(searchControlRef, () => setDropdownVisible(false))
  useEffect(() => {
    if (!autocompletions.length) {
      setDropdownVisible(false)
    }
  }, [autocompletions, setDropdownVisible])

  return (
    <Styled.SearchControl
      ref={searchControlRef}
      $scale={scale}
      $isDropdownVisible={isDropdownVisible}
      onKeyDown={onPressEsc}
    >
      <form onSubmit={onSubmit}>
        <Styled.SearchLabel $scale={scale} htmlFor={id}>
          <Icon scale={scale}>
            <IconSearch />
          </Icon>
        </Styled.SearchLabel>
        <InputField
          ref={searchInputRef}
          id={id}
          name="search"
          value={input}
          scale={scale}
          autoFocus={autoFocus}
          onChange={(e) => {
            onChange(e)
            handleDropdown()
          }}
          onFocus={handleDropdown}
          onClick={handleDropdown}
        />
        <Styled.SearchControlBar $scale={scale}>
          {input && (
            <Styled.ButtonResetSearch type="reset" onClick={onReset}>
              <Icon scale={scale}>
                <IconClose />
              </Icon>
            </Styled.ButtonResetSearch>
          )}
        </Styled.SearchControlBar>
        <input type="submit" hidden />
      </form>
      {isDropdownVisible && (
        <SearchDropdown
          scale={scale}
          items={autocompletions}
          onSelectAutocompletion={onSelectAutocompletion}
        />
      )}
    </Styled.SearchControl>
  )
}

export default memo(SearchControl)
