import type { CSSInterpolation } from "@emotion/serialize"
import { THEMES, SCALES, SUPPORTED_SEARCH_SUGGESTIONS } from ".."

export namespace Global {
  export type ThemeShape = typeof THEMES

  export type Theme = ThemeShape[keyof typeof THEMES]

  export type ComponentThemeShape<ThemeShape> = {
    [key in keyof ThemeShape]: (props: {
      [key: string]: string | number
    }) => CSSInterpolation
  }

  export type ComponentTheme = ComponentThemeShape<ThemeShape>

  export type ScaleShape = typeof SCALES

  export type Scale = keyof ScaleShape

  export type ComponentScaleShape<Scale> = {
    [key in keyof Scale]: number
  }

  export type ScaleProperty = {
    scale: Scale
  }

  export type ScaleCSSProperty = {
    $scale: Scale
  }

  export type ThemeProperty = {
    theme: Theme
  }

  export type SupportedSearchSuggestions =
    (typeof SUPPORTED_SEARCH_SUGGESTIONS)[keyof typeof SUPPORTED_SEARCH_SUGGESTIONS]

  export type ComponentScale = ComponentScaleShape<ScaleShape>
}
