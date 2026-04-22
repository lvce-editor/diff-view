import { SyntaxHighlightingWorker } from '@lvce-editor/rpc-registry'
import type { SyntaxLanguageInfo } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import { canTokenize } from '../CanTokenize/CanTokenize.ts'

export const tokenizeCodeBlock = async (content: string, language: SyntaxLanguageInfo): Promise<readonly TokenizedLine[]> => {
  if (!canTokenize(language)) {
    return []
  }
  try {
    const result = await SyntaxHighlightingWorker.invoke('Tokenizer.tokenizeCodeBlock', content, language.languageId, language.tokenizerPath)
    if (!Array.isArray(result)) {
      return []
    }
    return result as readonly TokenizedLine[]
  } catch {
    return []
  }
}
