import { useState } from "react"
import type { FC, PropsWithChildren } from "react"
import ThemeContext from "./ThemeContext"
import { DEFAULT_THEME } from "../../config"

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme] = useState(DEFAULT_THEME)

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
