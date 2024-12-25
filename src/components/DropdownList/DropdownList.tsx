import type { FC, PropsWithChildren, KeyboardEvent, MouseEvent } from "react"
import type { Global } from "../../config/types"
import * as Styled from "./DropdownList.style"

export const DropdownList: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Styled.DropdownList aria-label="Search Suggestion List">
      {children}
    </Styled.DropdownList>
  )
}

type DropdownListItem = {
  onClick: (e: MouseEvent<HTMLLIElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLLIElement>) => void
} & Global.ScaleProperty &
  PropsWithChildren

export const DropdownListItem: FC<DropdownListItem> = ({
  scale,
  children,
  onClick,
  onKeyDown,
}) => {
  return (
    <Styled.DropdownListItem
      tabIndex={0}
      $scale={scale}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </Styled.DropdownListItem>
  )
}
