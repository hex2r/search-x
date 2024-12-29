export function getMeta(totalResults: number, responseTimeout: number) {
  return `${totalResults} results found (${responseTimeout} seconds)`
}
