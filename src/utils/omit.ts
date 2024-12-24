type OmittedObj<T> =
  | {
      [key in string]: T
    }
  | {
      [key in number]: T
    }

export const omit = <T>(obj: OmittedObj<T>, keyToDelete: string) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => key !== keyToDelete)
  )
}
