import { SyntaxHighlightingWorker } from '@lvce-editor/rpc-registry'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import { getLanguages } from '../GetLanguages/GetLanguages.ts'
import { getSyntaxLanguage, type SyntaxLanguageInfo } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'

interface SyntaxHighlightingState {
  readonly languageIdLeft: string
  readonly languageIdRight: string
  readonly tokenizedLinesLeft: readonly TokenizedLine[]
  readonly tokenizedLinesRight: readonly TokenizedLine[]
}

const emptySyntaxHighlightingState: SyntaxHighlightingState = {
  languageIdLeft: 'unknown',
  languageIdRight: 'unknown',
  tokenizedLinesLeft: [],
  tokenizedLinesRight: [],
}

const canTokenize = (language: SyntaxLanguageInfo): boolean => {
  return language.languageId !== 'unknown' && !!language.tokenizerPath
}

const loadTokenizer = async (language: SyntaxLanguageInfo): Promise<void> => {
  if (!canTokenize(language)) {
    return
  }
  await SyntaxHighlightingWorker.loadTokenizer(language.languageId, language.tokenizerPath)
}

const tokenizeCodeBlock = async (content: string, language: SyntaxLanguageInfo): Promise<readonly TokenizedLine[]> => {
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

const getUniqueLanguages = (languageLeft: SyntaxLanguageInfo, languageRight: SyntaxLanguageInfo): readonly SyntaxLanguageInfo[] => {
  return [...new Map([languageLeft, languageRight].map((language) => [`${language.languageId}:${language.tokenizerPath}`, language])).values()]
}

export const loadSyntaxHighlighting = async (
  contentLeft: string,
  contentRight: string,
  uriLeft: string,
  uriRight: string,
  platform: number,
  assetDir: string,
): Promise<SyntaxHighlightingState> => {
  try {
    const languages = await getLanguages(platform, assetDir)
    const languageLeft = getSyntaxLanguage(uriLeft, languages)
    const languageRight = getSyntaxLanguage(uriRight, languages)
    const uniqueLanguages = getUniqueLanguages(languageLeft, languageRight)
    await Promise.all(uniqueLanguages.map(loadTokenizer))
    const [tokenizedLinesLeft, tokenizedLinesRight] = await Promise.all([tokenizeCodeBlock(contentLeft, languageLeft), tokenizeCodeBlock(contentRight, languageRight)])
    return {
      languageIdLeft: languageLeft.languageId,
      languageIdRight: languageRight.languageId,
      tokenizedLinesLeft,
      tokenizedLinesRight,
    }
  } catch {
    return emptySyntaxHighlightingState
  }
}
