import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffUris } from '../GetInlineDiffUris/GetInlineDiffUris.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getMinLineY } from '../GetMinLineY/GetMinLineY.ts'
import { getNumberOfVisibleItems } from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getRenderMode } from '../GetRenderMode/GetRenderMode.ts'
import { getScrollBarHeight } from '../GetScrollBarHeight/GetScrollBarHeight.ts'
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
  const total = Math.max(
    renderModeLeft === 'image' ? 1 : getLineCount(getDisplayedContent(contentLeft, errorLeftMessage, errorLeftStack)),
    renderModeRight === 'image' ? 1 : getLineCount(getDisplayedContent(contentRight, errorRightMessage, errorRightStack)),
  )
  const contentHeight = total * itemHeight
  const numberOfVisibleItems = getNumberOfVisibleItems(height, itemHeight)
  const maxLineY = Math.min(minLineY + numberOfVisibleItems, total)
  const deltaY = minLineY * itemHeight
  const finalDeltaY = Math.max(contentHeight - height, 0)
  const scrollBarHeight = getScrollBarHeight(height, contentHeight, minimumSliderSize)
  return {
    ...state,
    contentLeft,
    contentRight,
    deltaY,
    errorLeftMessage,
    errorLeftStack,
    errorRightMessage,
    errorRightStack,
    finalDeltaY,
    initial: false,
    maxLineY,
    minLineY,
    renderModeLeft,
    renderModeRight,
    scrollBarActive: contentHeight > height,
    scrollBarHeight,
    uriLeft,
    uriRight,
  }
}
