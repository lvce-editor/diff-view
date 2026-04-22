import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffState } from '../GetInlineDiffState/GetInlineDiffState.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getRenderMode } from '../GetRenderMode/GetRenderMode.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getDisplayedContent } from '../GetTotalLineCount/GetTotalLineCount.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'
import { loadImageSrc } from '../LoadImageSrc/LoadImageSrc.ts'
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
  const [imageSrcLeft, imageSrcRight] = await Promise.all([
    renderModeLeft === 'image' && !errorLeftMessage ? loadImageSrc(uriLeft) : Promise.resolve(''),
    renderModeRight === 'image' && !errorRightMessage ? loadImageSrc(uriRight) : Promise.resolve(''),
  ])

  const nextState = {
    ...state,
    contentLeft,
    contentRight,
    errorLeftMessage,
    errorLeftStack,
    errorRightMessage,
    errorRightStack,
    imageSrcLeft,
    imageSrcRight,
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

  const { visibleLinesLeft, visibleLinesRight } = getVisibleLinesState({
    contentLeft: nextState.contentLeft,
    contentRight: nextState.contentRight,
    inlineChanges: nextState.inlineChanges,
    maxLineY: nextState.maxLineY,
    minLineY: nextState.minLineY,
    tokenizedLinesLeft: nextState.tokenizedLinesLeft,
    tokenizedLinesRight: nextState.tokenizedLinesRight,
    totalLineCountLeft: nextState.totalLineCountLeft,
    totalLineCountRight: nextState.totalLineCountRight,
  })
<<<<<<< HEAD
  console.log({ visibleLinesLeft, visibleLinesRight, inlineChanges })
=======
>>>>>>> origin/main

  return {
    ...nextState,
    visibleLinesLeft,
    visibleLinesRight,
  }
}
