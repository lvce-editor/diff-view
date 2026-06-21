import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const copy = (): string => {
  return I18nString.i18nString(UiStrings.Copy)
}

export const cut = (): string => {
  return I18nString.i18nString(UiStrings.Cut)
}

export const paste = (): string => {
  return I18nString.i18nString(UiStrings.Paste)
}
