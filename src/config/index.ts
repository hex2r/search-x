//-- API
// Todo: get from .env
export const API_URL = "http://localhost:5173"

export const ENDPOINT_SEARCH = "/search"

export const ENDPOINT_AUTOCOMPLETIONS = "/autocompletions"

export const API_SEARCH_URL = new URL(`${API_URL}${ENDPOINT_SEARCH}`).href

export const API_AUTOCOMPLETIONS_URL = new URL(
  `${API_URL}${ENDPOINT_AUTOCOMPLETIONS}`
).href

export const SEARCH_QUERY_PARAM = "query"

export const RESPONSE_TIMEOUT = 500

//-- APPLICATION
export const SCALES = {
  small: "small",
  medium: "medium",
  large: "large",
} as const

export const SEARCH_AUTOCOMPLETION_TYPES = {
  DEFAULT: "default",
  HISTORY: "history",
} as const

export const KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESC: "Escape",
} as const

export const TOTAL_DISPLAYED_AUTOCOMPLETIONS = 10

export const MAX_DISPLAYED_HISTORY_AUTOCOMPLETIONS = 4

export const ITEMS_PER_PAGE = 1

export const DEFAULT_SCALE = SCALES.medium
