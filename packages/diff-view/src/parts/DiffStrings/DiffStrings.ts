import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const copy = (): string => {
  return I18nString.i18nString(UiStrings.Copy)
}

export const acceptCurrentChangeAcceptIncomingChangeAcceptBoth = (): string => {
  return I18nString.i18nString(UiStrings.AcceptCurrentChangeAcceptIncomingChangeAcceptBoth)
}

export const cut = (): string => {
  return I18nString.i18nString(UiStrings.Cut)
}

export const hideWhitespace = (): string => {
  return I18nString.i18nString(UiStrings.HideWhitespace)
}

export const incomingChange = (): string => {
  return I18nString.i18nString(UiStrings.IncomingChange)
}

export const inline = (): string => {
  return I18nString.i18nString(UiStrings.Inline)
}

export const paste = (): string => {
  return I18nString.i18nString(UiStrings.Paste)
}

export const search = (): string => {
  return I18nString.i18nString(UiStrings.Search)
}

export const showWhitespace = (): string => {
  return I18nString.i18nString(UiStrings.ShowWhitespace)
}

export const sideBySide = (): string => {
  return I18nString.i18nString(UiStrings.SideBySide)
}

export const switchToDiff = (label: string): string => {
  return I18nString.i18nString(UiStrings.SwitchToDiff, { PH1: label })
}
