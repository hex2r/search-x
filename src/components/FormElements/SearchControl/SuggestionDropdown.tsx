import type { FC, KeyboardEvent, MouseEvent } from "react"
import * as Styled from "./SuggestionDropdown.style"
import {
  DEFAULT_SCALE,
  DEFAULT_THEME,
  SUPPORTED_SEARCH_SUGGESTIONS,
} from "../../../config"
import type { Global } from "../../../config"
import { Typography } from "../../Typography"
import { Icon } from "../../Icon"
import { DropdownList, DropdownListItem } from "../../DropdownList"
import IconSearch from "../../../assets/search.svg?react"
import IconHistory from "../../../assets/history.svg?react"
import type {
  SearchSuggestion,
  HistorySuggestion,
  SupportedSearchSuggestions,
} from "./type"

type SuggestionItem = SupportedSearchSuggestions &
  Global.ScaleProperty &
  Global.ThemeProperty

const SuggestionItem: FC<SuggestionItem> = ({
  id,
  type,
  search,
  scale,
  theme,
}) => {
  const renderSuggestion = ({ search }: SearchSuggestion) => {
    return (
      <>
        <Icon scale={scale} theme={theme}>
          <IconSearch />
        </Icon>
        <Typography cropped tag="div" cx={{ flexGrow: 1 }}>
          {search}
        </Typography>
      </>
    )
  }

  const renderHistorySuggestion = ({ search }: HistorySuggestion) => {
    return (
      <>
        <Icon scale={scale} theme={theme}>
          <IconHistory />
        </Icon>
        <Typography cropped tag="div" cx={{ flexGrow: 1 }}>
          {search}
        </Typography>
        <button>Delete</button>
      </>
    )
  }

  return type === SUPPORTED_SEARCH_SUGGESTIONS.history
    ? renderHistorySuggestion({ id, type, search })
    : renderSuggestion({ id, type, search })
}

type SuggestionsDropdown<T extends object> = {
  items: Array<T>
  onSelect: (search: string) => void
} & Global.ScaleProperty &
  Global.ThemeProperty

export const SuggestionsDropdown: FC<
  SuggestionsDropdown<SupportedSearchSuggestions>
> = ({ items, scale = DEFAULT_SCALE, theme = DEFAULT_THEME, onSelect }) => {
  const handleClick = (_: MouseEvent, value: string) => {
    onSelect(value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, value: string) => {
    if (e.key === "Enter" || e.key === " ") {
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
            onClick={(e) => handleClick(e, item.search)}
            onKeyDown={(e) => handleKeyDown(e, item.search)}
          >
            <SuggestionItem scale={scale} theme={theme} {...item} />
          </DropdownListItem>
        ))}
      </DropdownList>
    </Styled.SearchDropdown>
  )
}
