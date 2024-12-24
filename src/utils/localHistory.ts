export const SEARCH_HISTORY = "searchHistory"

export const parseLocalStorageJSON = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "null")
}

export const getSearchHistory = () => {
  return parseLocalStorageJSON(SEARCH_HISTORY) || {}
}
