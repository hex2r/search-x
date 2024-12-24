export const THEMES = {
  material: "material",
} as const

export const SCALES = {
  small: "small",
  medium: "medium",
  large: "large",
} as const

export const SUPPORTED_SEARCH_SUGGESTIONS = {
  history: "history",
  search: "search",
} as const

export const KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESC: "Escape",
} as const

export const EMPTY_STRING = ""

export const MAX_DISPLAYED_SUGGESTIONS = 10 as const

export const DEFAULT_THEME = THEMES.material

export const DEFAULT_SCALE = SCALES.medium

export const DB_URL = "http://localhost:3306"

export const DATA_ENDPOINT = "/data"

export const DATA_URL = new URL(`${DB_URL}${DATA_ENDPOINT}`)

export const SUGGESTIONS_ENDPOINT = "/suggestions"

export const SUGGESTIONS_URL = new URL(`${DB_URL}${SUGGESTIONS_ENDPOINT}`)
