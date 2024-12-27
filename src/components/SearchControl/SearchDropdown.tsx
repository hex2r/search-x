import type { FC, KeyboardEvent, MouseEvent } from "react"
import * as Styled from "./SearchDropdown.style"
import { KEYS, DEFAULT_SCALE, SEARCH_AUTOCOMPLETION_TYPES } from "../../config"
import type { Global } from "../../config/types"
import type { Autocompletion } from "./types"
import { DropdownList, DropdownListItem } from "../DropdownList"
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
} & Global.ScaleProperty

export const SearchDropdown: FC<SearchDropdown<Autocompletion>> = ({
  items,
  scale = DEFAULT_SCALE,
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
    <Styled.SearchDropdown $scale={scale} tabIndex={-1}>
      <DropdownList>
        {items.map((item) => (
          <DropdownListItem
            key={item.id}
            scale={scale}
            onClick={(e) => handleClick(e, item.search)}
            onKeyDown={(e) => handleKeyDown(e, item.search)}
          >
            {item.type === SEARCH_AUTOCOMPLETION_TYPES.HISTORY ? (
              <HistoryAutocompletionItem scale={scale} {...item} />
            ) : (
              <SearchAutocompletionItem scale={scale} {...item} />
            )}
          </DropdownListItem>
        ))}
      </DropdownList>
    </Styled.SearchDropdown>
  )
}
