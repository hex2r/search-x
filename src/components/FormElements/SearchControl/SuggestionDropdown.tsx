import type { FC, KeyboardEvent, MouseEvent } from "react"
import * as Styled from "./SuggestionDropdown.style"
import { DEFAULT_SCALE, DEFAULT_THEME, KEYS } from "../../../config"
import type { Global } from "../../../config"
import { Typography } from "../../Typography"
import { Icon } from "../../Icon"
import { DropdownList, DropdownListItem } from "../../DropdownList"
import IconSearch from "../../../assets/search.svg?react"
import IconHistory from "../../../assets/history.svg?react"
import type {
  AutoCompletion,
  SearchSuggestion,
  HistorySuggestion,
} from "../../../contexts/Search/types"

type SearchSuggestionItem = SearchSuggestion &
  Global.ScaleProperty &
  Global.ThemeProperty

type HistorySuggestionItem = HistorySuggestion &
  Global.ScaleProperty &
  Global.ThemeProperty

const SearchSuggestionItem = ({
  scale,
  theme,
  content,
}: SearchSuggestionItem) => {
  return (
    <>
      <Icon scale={scale} theme={theme}>
        <IconSearch />
      </Icon>
      <Typography cropped tag="div" cx={{ flexGrow: 1 }}>
        {content.search}
      </Typography>
    </>
  )
}

const HistorySuggestionItem = ({
  scale,
  theme,
  content,
}: HistorySuggestionItem) => {
  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation()
    console.log("click")
    content.onDelete(content.search)
  }

  const handleKeyboardDelete = (e: KeyboardEvent) => {
    if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
      e.stopPropagation()
      e.preventDefault()
      content.onDelete(content.search)
    }
  }

  return (
    <>
      <Icon scale={scale} theme={theme}>
        <IconHistory />
      </Icon>
      <Typography cropped tag="div" cx={{ flexGrow: 1 }}>
        {content.search}
      </Typography>
      <button
        type="button"
        onClick={handleDelete}
        onKeyDown={handleKeyboardDelete}
      >
        Delete
      </button>
    </>
  )
}

type SuggestionsDropdown<T extends object> = {
  items: Array<T>
  onSelect: (search: string) => void
} & Global.ScaleProperty &
  Global.ThemeProperty

export const SuggestionsDropdown: FC<SuggestionsDropdown<AutoCompletion>> = ({
  items,
  scale = DEFAULT_SCALE,
  theme = DEFAULT_THEME,
  onSelect,
}) => {
  const handleClick = (_: MouseEvent, value: string) => {
    onSelect(value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, value: string) => {
    if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
      e.preventDefault()
      onSelect(value)
    }
  }

  return (
    <Styled.SearchDropdown $theme={theme} $scale={scale} tabIndex={-1}>
      <DropdownList>
        {items.map((item, idx) => (
          <DropdownListItem
            key={idx}
            scale={scale}
            onClick={(e) => handleClick(e, item.content.search)}
            onKeyDown={(e) => handleKeyDown(e, item.content.search)}
          >
            {item.type === "history" ? (
              <HistorySuggestionItem scale={scale} theme={theme} {...item} />
            ) : (
              <SearchSuggestionItem scale={scale} theme={theme} {...item} />
            )}
          </DropdownListItem>
        ))}
      </DropdownList>
    </Styled.SearchDropdown>
  )
}
