import { useContext } from "react"
import ThemeContext from "./ThemeContext"

const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new ReferenceError(
      "The following component should be used within ThemeContext"
    )
  }

  return context
}

export default useThemeContext
