import { createContext } from "react"
import type { Global } from "../../config/types"

const ThemeContext = createContext<Global.Theme | null>(null)

export default ThemeContext
