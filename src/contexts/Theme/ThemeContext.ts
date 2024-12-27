import { createContext } from "react"
import type { Global } from "../../config/types"

// Todo: use @emotion Theming
const ThemeContext = createContext<Global.Theme | null>(null)

export default ThemeContext
