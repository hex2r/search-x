import { SCALES, SEARCH_AUTOCOMPLETION_TYPES } from ".."

export namespace Global {
  export type ScaleShape = typeof SCALES

  export type Scale = keyof ScaleShape

  export type ComponentScaleShape<Scale> = {
    [key in keyof Scale]: number
  }

  export type ScaleProperty = {
    scale: Scale
  }

  export type SupportedSearchSuggestions =
    (typeof SEARCH_AUTOCOMPLETION_TYPES)[keyof typeof SEARCH_AUTOCOMPLETION_TYPES]

  export type ComponentScale = ComponentScaleShape<ScaleShape>
}
