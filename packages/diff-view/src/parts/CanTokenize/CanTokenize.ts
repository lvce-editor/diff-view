import type { SyntaxLanguageInfo } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'

export const canTokenize = (language: SyntaxLanguageInfo): boolean => {
  return language.languageId !== 'unknown' && !!language.tokenizerPath
}
