import { SyntaxHighlightingWorker } from '@lvce-editor/rpc-registry'
import type { SyntaxLanguageInfo } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'
import { canTokenize } from '../CanTokenize/CanTokenize.ts'

export const loadTokenizer = async (language: SyntaxLanguageInfo): Promise<void> => {
  if (!canTokenize(language)) {
    return
  }
  await SyntaxHighlightingWorker.loadTokenizer(language.languageId, language.tokenizerPath)
}
