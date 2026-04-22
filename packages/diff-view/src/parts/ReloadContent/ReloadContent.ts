import type { DiffViewState, RenderMode } from '../DiffViewState/DiffViewState.ts'
import { getGutterWidthVariable } from '../GetGutterWidthVariable/GetGutterWidthVariable.ts'
import { getInlineDiffState } from '../GetInlineDiffState/GetInlineDiffState.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getRenderMode } from '../GetRenderMode/GetRenderMode.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getDisplayedContent } from '../GetTotalLineCount/GetTotalLineCount.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'
import { loadImageSrc } from '../LoadImageSrc/LoadImageSrc.ts'
import { loadSyntaxHighlighting } from '../LoadSyntaxHighlighting/LoadSyntaxHighlighting.ts'

const loadImages = async (
  renderModeLeft: RenderMode,
  renderModeRight: RenderMode,
  errorLeftMessage: string,
  errorRightMessage: string,
  uriLeft: string,
  uriRight: string,
): Promise<readonly [string, string]> => {
  return Promise.all([
    renderModeLeft === 'image' && !errorLeftMessage ? loadImageSrc(uriLeft) : Promise.resolve(''),
    renderModeRight === 'image' && !errorRightMessage ? loadImageSrc(uriRight) : Promise.resolve(''),
  ])
}

export const reloadContent = async (
  state: DiffViewState,
  contentLeft: string,
  contentRight: string,
  errorLeftMessage: string,
  errorLeftCodeFrame: string,
  errorLeftStack: string,
  errorRightMessage: string,
  errorRightCodeFrame: string,
  errorRightStack: string,
): Promise<DiffViewState> => {
  const { assetDir, height, itemHeight, knownImageExtensions, minimumSliderSize, minLineY, platform, uriLeft, uriRight } = state
  const renderModeLeft = getRenderMode(uriLeft, knownImageExtensions)
  const renderModeRight = getRenderMode(uriRight, knownImageExtensions)
  const displayedContentLeft = getDisplayedContent(contentLeft, errorLeftMessage, errorLeftCodeFrame, errorLeftStack)
  const displayedContentRight = getDisplayedContent(contentRight, errorRightMessage, errorRightCodeFrame, errorRightStack)
  const totalLineCountLeft = renderModeLeft === 'image' ? 1 : getLineCount(displayedContentLeft)
  const totalLineCountRight = renderModeRight === 'image' ? 1 : getLineCount(displayedContentRight)
  const gutterWidthVariable = getGutterWidthVariable(Math.max(totalLineCountLeft, totalLineCountRight))
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
  const [imageSrcLeft, imageSrcRight] = await loadImages(renderModeLeft, renderModeRight, errorLeftMessage, errorRightMessage, uriLeft, uriRight)

  const nextState = {
    ...state,
    contentLeft,
    contentRight,
    errorLeftCodeFrame,
    errorLeftMessage,
    errorLeftStack,
    errorRightCodeFrame,
    errorRightMessage,
    errorRightStack,
    imageSrcLeft,
    imageSrcRight,
    initial: false,
    inlineChanges,
    languageIdLeft: syntaxHighlightingState?.languageIdLeft || 'unknown',
    languageIdRight: syntaxHighlightingState?.languageIdRight || 'unknown',
    gutterWidthVariable,
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

  return {
    ...nextState,
    visibleLinesLeft,
    visibleLinesRight,
  }
}
