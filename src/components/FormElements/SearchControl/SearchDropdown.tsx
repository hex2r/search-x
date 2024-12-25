import type { FC, KeyboardEvent, MouseEvent } from "react"
import * as Styled from "./SearchDropdown.style"
import {
  KEYS,
  DEFAULT_SCALE,
  DEFAULT_THEME,
  SEARCH_AUTOCOMPLETION_TYPES,
} from "../../../config"
import type { Global } from "../../../config"
import type { Autocompletion } from "../../../contexts/Search/types"
import { DropdownList, DropdownListItem } from "../../DropdownList"
import {
  HistoryAutocompletionItem,
  SearchAutocompletionItem,
} from "./SearchDropdownItem"

type SearchDropdown<T extends object> = {
  items: T[]
  onSelectAutocompletionItem: (
    e: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
    search: string
  ) => void
} & Global.ScaleProperty &
  Global.ThemeProperty

export const SearchDropdown: FC<SearchDropdown<Autocompletion>> = ({
  items,
  scale = DEFAULT_SCALE,
  theme = DEFAULT_THEME,
  onSelectAutocompletionItem,
}) => {
  const handleClick = (e: MouseEvent<HTMLLIElement>, searchQuery: string) => {
    onSelectAutocompletionItem(e, searchQuery)
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLLIElement>,
    searchQuery: string
  ) => {
    if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
      e.preventDefault()
      onSelectAutocompletionItem(e, searchQuery)
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
            {item.type === SEARCH_AUTOCOMPLETION_TYPES.HISTORY ? (
              <HistoryAutocompletionItem
                scale={scale}
                theme={theme}
                {...item}
              />
            ) : (
              <SearchAutocompletionItem scale={scale} theme={theme} {...item} />
            )}
          </DropdownListItem>
        ))}
      </DropdownList>
    </Styled.SearchDropdown>
  )
}
