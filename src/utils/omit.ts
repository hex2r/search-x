export const omit = <T extends object>(obj: T, keyToDelete: string) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => key !== keyToDelete)
  )
}
