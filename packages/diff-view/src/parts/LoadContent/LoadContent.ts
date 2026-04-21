import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffState } from '../GetInlineDiffState/GetInlineDiffState.ts'
import { getInlineDiffUris } from '../GetInlineDiffUris/GetInlineDiffUris.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getMinLineY } from '../GetMinLineY/GetMinLineY.ts'
import { getRenderMode } from '../GetRenderMode/GetRenderMode.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getDisplayedContent } from '../GetTotalLineCount/GetTotalLineCount.ts'
import { loadFileContents } from '../LoadFileContents/LoadFileContents.ts'
import { loadSyntaxHighlighting } from '../LoadSyntaxHighlighting/LoadSyntaxHighlighting.ts'

export const reloadContent = async (
  state: DiffViewState,
  contentLeft: string,
  contentRight: string,
  errorLeftMessage: string,
  errorLeftStack: string,
  errorRightMessage: string,
  errorRightStack: string,
): Promise<DiffViewState> => {
  const { assetDir, height, itemHeight, knownImageExtensions, minimumSliderSize, minLineY, platform, uriLeft, uriRight } = state
  const renderModeLeft = getRenderMode(uriLeft, knownImageExtensions)
  const renderModeRight = getRenderMode(uriRight, knownImageExtensions)
  const displayedContentLeft = getDisplayedContent(contentLeft, errorLeftMessage, errorLeftStack)
  const displayedContentRight = getDisplayedContent(contentRight, errorRightMessage, errorRightStack)
  const totalLineCountLeft = renderModeLeft === 'image' ? 1 : getLineCount(displayedContentLeft)
  const totalLineCountRight = renderModeRight === 'image' ? 1 : getLineCount(displayedContentRight)
  const canComputeInlineDiff = renderModeLeft === 'text' && renderModeRight === 'text' && !errorLeftMessage && !errorRightMessage
  const { inlineChanges, totalLineCount } = canComputeInlineDiff
    ? await getInlineDiffState(contentLeft, contentRight)
    : {
        inlineChanges: [],
        totalLineCount: Math.max(totalLineCountLeft, totalLineCountRight),
      }
  const canHighlightLeft = renderModeLeft === 'text' && !errorLeftMessage
  const canHighlightRight = renderModeRight === 'text' && !errorRightMessage
  const syntaxHighlightingState =
    canHighlightLeft || canHighlightRight ? await loadSyntaxHighlighting(contentLeft, contentRight, uriLeft, uriRight, platform, assetDir) : undefined

  return {
    ...state,
    contentLeft,
    contentRight,
    errorLeftMessage,
    errorLeftStack,
    errorRightMessage,
    errorRightStack,
    initial: false,
    inlineChanges,
    languageIdLeft: syntaxHighlightingState?.languageIdLeft || 'unknown',
    languageIdRight: syntaxHighlightingState?.languageIdRight || 'unknown',
    renderModeLeft,
    renderModeRight,
    tokenizedLinesLeft: syntaxHighlightingState?.tokenizedLinesLeft || [],
    tokenizedLinesRight: syntaxHighlightingState?.tokenizedLinesRight || [],
    totalLineCount,
    totalLineCountLeft,
    totalLineCountRight,
    ...getScrollState(height, itemHeight, totalLineCount, minimumSliderSize, minLineY * itemHeight),
  }
}

export const loadContent = async (state: DiffViewState, savedState: unknown): Promise<DiffViewState> => {
  const { uri } = state
  const [uriLeft, uriRight] = getInlineDiffUris(uri)
  const { contentLeft, contentRight, errorLeftMessage, errorLeftStack, errorRightMessage, errorRightStack } = await loadFileContents(uriLeft, uriRight)
  const minLineY = getMinLineY(savedState)
  return reloadContent({ ...state, minLineY, uriLeft, uriRight }, contentLeft, contentRight, errorLeftMessage, errorLeftStack, errorRightMessage, errorRightStack)
}
