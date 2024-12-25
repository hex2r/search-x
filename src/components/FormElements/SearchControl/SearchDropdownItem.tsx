import type { MouseEvent, KeyboardEvent } from "react"
import { Typography } from "../../Typography"
import * as Styled from "./SearchDropdown.style"
import { Icon } from "../../Icon"
import IconSearch from "../../../assets/search.svg?react"
import IconHistory from "../../../assets/history.svg?react"
import { KEYS } from "../../../config"
import type { Global } from "../../../config"
// Todo: resolve this dependency
import type {
  SearchAutocompletion,
  HistoryAutocompletion,
} from "../../../contexts/Search/types"

export const SearchAutocompletionItem = ({
  scale,
  theme,
  content,
}: SearchAutocompletion & Global.ScaleProperty & Global.ThemeProperty) => (
  <>
    <Icon scale={scale} theme={theme}>
      <IconSearch />
    </Icon>
    <Typography cropped tag="div" cx={{ flexGrow: 1 }}>
      {content.search}
    </Typography>
  </>
)

export const HistoryAutocompletionItem = ({
  scale,
  theme,
  content,
}: HistoryAutocompletion & Global.ScaleProperty & Global.ThemeProperty) => {
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    content.onDelete(content.search)
  }

  const handleKeyboardDelete = (e: KeyboardEvent<HTMLButtonElement>) => {
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
      <Typography cropped tag="div" cx={{ flexGrow: 1, color: "#52188c" }}>
        {content.search}
      </Typography>
      <Styled.DeleteButton
        type="button"
        onClick={handleDelete}
        onKeyDown={handleKeyboardDelete}
      >
        Delete
      </Styled.DeleteButton>
    </>
  )
}
