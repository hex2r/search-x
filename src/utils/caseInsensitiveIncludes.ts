export const caseInsensitiveIncludes = (
  string: string,
  searchString: string
) => {
  return string.toLowerCase().includes(searchString.toLowerCase())
}
