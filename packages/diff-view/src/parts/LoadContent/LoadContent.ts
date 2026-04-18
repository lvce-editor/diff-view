import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import { getInlineDiffChanges } from '../GetInlineDiffChanges/GetInlineDiffChanges.ts'
import { getInlineDiffUris } from '../GetInlineDiffUris/GetInlineDiffUris.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getMinLineY } from '../GetMinLineY/GetMinLineY.ts'
import { getRenderMode } from '../GetRenderMode/GetRenderMode.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getDisplayedContent } from '../GetTotalLineCount/GetTotalLineCount.ts'
import { loadFileContents } from '../LoadFileContents/LoadFileContents.ts'

const getInlineDiffState = async (
  contentLeft: string,
  contentRight: string,
): Promise<{ readonly inlineChanges: readonly InlineDiffChange[]; readonly totalLineCount: number }> => {
  const linesLeft = contentLeft ? contentLeft.split('\n') : ['']
  const linesRight = contentRight ? contentRight.split('\n') : ['']
  const inlineChanges = await getInlineDiffChanges(linesLeft, linesRight)
  return {
    inlineChanges,
    totalLineCount: Math.max(inlineChanges.length, 1),
  }
}

export const loadContent = async (state: DiffViewState, savedState: unknown): Promise<DiffViewState> => {
  const { height, itemHeight, knownImageExtensions, minimumSliderSize, uri } = state
  const [uriLeft, uriRight] = getInlineDiffUris(uri)
  const [leftResult, rightResult] = await loadFileContents(uriLeft, uriRight)
  const { content: contentLeft, errorMessage: errorLeftMessage, errorStack: errorLeftStack } = leftResult
  const { content: contentRight, errorMessage: errorRightMessage, errorStack: errorRightStack } = rightResult
  const renderModeLeft = getRenderMode(uriLeft, knownImageExtensions)
  const renderModeRight = getRenderMode(uriRight, knownImageExtensions)
  const minLineY = getMinLineY(savedState)
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
    renderModeLeft,
    renderModeRight,
    totalLineCount,
    totalLineCountLeft,
    totalLineCountRight,
    uriLeft,
    uriRight,
    ...getScrollState(height, itemHeight, totalLineCount, minimumSliderSize, minLineY * itemHeight),
  }
}
