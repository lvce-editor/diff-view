import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import { getLanguages } from '../GetLanguages/GetLanguages.ts'
import { getSyntaxLanguage } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'
import { getUniqueLanguages } from '../GetUniqueLanguages/GetUniqueLanguages.ts'
import { loadTokenizer } from '../LoadTokenizer/LoadTokenizer.ts'
import { tokenizeCodeBlock } from '../TokenizeCodeBlock/TokenizeCodeBlock.ts'

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
