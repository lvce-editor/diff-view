import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getInlineDiffUris } from '../GetInlineDiffUris/GetInlineDiffUris.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getMinLineY } from '../GetMinLineY/GetMinLineY.ts'
import { getRenderMode } from '../GetRenderMode/GetRenderMode.ts'
import { loadFileContents } from '../LoadFileContents/LoadFileContents.ts'

const getDisplayedContent = (content: string, errorMessage: string, errorStack: string): string => {
  if (!errorMessage) {
    return content
  }
  return errorStack ? `${errorMessage}\n\n${errorStack}` : errorMessage
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
  const totalLineCount = Math.max(
    renderModeLeft === 'image' ? 1 : getLineCount(getDisplayedContent(contentLeft, errorLeftMessage, errorLeftStack)),
    renderModeRight === 'image' ? 1 : getLineCount(getDisplayedContent(contentRight, errorRightMessage, errorRightStack)),
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
    uriLeft,
    uriRight,
    ...scrollState,
  }
}
