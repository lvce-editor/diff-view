/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable @cspell/spellchecker */
import type { SyntaxLanguageInfo } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import { canTokenize } from '../CanTokenize/CanTokenize.ts'
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

const getLanguageKey = (language: SyntaxLanguageInfo): string => {
  return `${language.languageId}:${language.tokenizerPath}`
}

const loadAvailableTokenizers = async (languages: readonly SyntaxLanguageInfo[]): Promise<ReadonlySet<string>> => {
  const loadedLanguages = new Set<string>()
  await Promise.all(
    languages.map(async (language) => {
      if (!canTokenize(language)) {
        return
      }
      try {
        await loadTokenizer(language)
        loadedLanguages.add(getLanguageKey(language))
      } catch {
        // Keep the other pane highlightable when one tokenizer fails to initialize.
      }
    }),
  )
  return loadedLanguages
}

const tokenizeLoadedLanguage = async (content: string, language: SyntaxLanguageInfo, loadedLanguages: ReadonlySet<string>): Promise<readonly TokenizedLine[]> => {
  if (!loadedLanguages.has(getLanguageKey(language))) {
    return []
  }
  return tokenizeCodeBlock(content, language)
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
    const loadedLanguages = await loadAvailableTokenizers(uniqueLanguages)
    const [tokenizedLinesLeft, tokenizedLinesRight] = await Promise.all([
      tokenizeLoadedLanguage(contentLeft, languageLeft, loadedLanguages),
      tokenizeLoadedLanguage(contentRight, languageRight, loadedLanguages),
    ])
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
