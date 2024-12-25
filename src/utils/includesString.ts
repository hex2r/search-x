export const includesString = (string: string, search: string) => {
  return string.toLocaleLowerCase().includes(search.toLocaleLowerCase())
}
