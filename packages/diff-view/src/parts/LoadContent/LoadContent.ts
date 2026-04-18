import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffUris } from '../GetInlineDiffUris/GetInlineDiffUris.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getMinLineY } from '../GetMinLineY/GetMinLineY.ts'
import { getRenderMode } from '../GetRenderMode/GetRenderMode.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getDisplayedContent, getTotalLineCount } from '../GetTotalLineCount/GetTotalLineCount.ts'
import { loadFileContents } from '../LoadFileContents/LoadFileContents.ts'

export const loadContent = async (state: DiffViewState, savedState: unknown): Promise<DiffViewState> => {
  const { diffMode, height, itemHeight, knownImageExtensions, minimumSliderSize, uri } = state
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
  const totalLineCount = getTotalLineCount(
    diffMode,
    contentLeft,
    contentRight,
    errorLeftMessage,
    errorLeftStack,
    errorRightMessage,
    errorRightStack,
    renderModeLeft,
    renderModeRight,
  )
  const scrollState = getScrollState(height, itemHeight, totalLineCount, minimumSliderSize, minLineY * itemHeight)
  return {
    ...state,
    contentLeft,
    contentRight,
    errorLeftMessage,
    errorLeftStack,
    errorRightMessage,
    errorRightStack,
    initial: false,
    renderModeLeft,
    renderModeRight,
    totalLineCount,
    totalLineCountLeft,
    totalLineCountRight,
    uriLeft,
    uriRight,
    ...scrollState,
  }
}
