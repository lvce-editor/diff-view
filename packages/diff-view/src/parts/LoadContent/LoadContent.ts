import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffUris } from '../GetInlineDiffUris/GetInlineDiffUris.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getMinLineY } from '../GetMinLineY/GetMinLineY.ts'
import { getNumberOfVisibleItems } from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getScrollBarHeight } from '../GetScrollBarHeight/GetScrollBarHeight.ts'
import { readFile } from '../ReadFile/ReadFile.ts'

export const loadContent = async (state: DiffViewState, savedState: unknown): Promise<DiffViewState> => {
  const { height, itemHeight, minimumSliderSize, uri } = state
  const [uriLeft, uriRight] = getInlineDiffUris(uri)
  const [contentLeft, contentRight] = await Promise.all([readFile(uriLeft), readFile(uriRight)])
  const minLineY = getMinLineY(savedState)
  const total = Math.max(getLineCount(contentLeft), getLineCount(contentRight))
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
    finalDeltaY,
    initial: false,
    maxLineY,
    minLineY,
    scrollBarActive: contentHeight > height,
    scrollBarHeight,
    uriLeft,
    uriRight,
  }
}
