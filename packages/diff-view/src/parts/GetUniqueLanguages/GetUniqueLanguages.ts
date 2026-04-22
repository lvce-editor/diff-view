import type { SyntaxLanguageInfo } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'

export const getUniqueLanguages = (languageLeft: SyntaxLanguageInfo, languageRight: SyntaxLanguageInfo): readonly SyntaxLanguageInfo[] => {
  return [...new Map([languageLeft, languageRight].map((language) => [`${language.languageId}:${language.tokenizerPath}`, language])).values()]
}
