import { getNumberOfVisibleItems } from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getScrollBarHeight } from '../GetScrollBarHeight/GetScrollBarHeight.ts'
import { clamp } from '../Clamp/Clamp.ts'

export interface ScrollState {
  readonly deltaY: number
  readonly finalDeltaY: number
  readonly maxLineY: number
  readonly minLineY: number
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
}

export const getScrollState = (height: number, itemHeight: number, totalLineCount: number, minimumSliderSize: number, deltaY: number): ScrollState => {
  const safeItemHeight = Math.max(itemHeight, 1)
  const safeTotalLineCount = Math.max(totalLineCount, 1)
  const contentHeight = safeTotalLineCount * safeItemHeight
  const finalDeltaY = Math.max(contentHeight - height, 0)
  const clampedDeltaY = clamp(deltaY, 0, finalDeltaY)
  const minLineY = Math.floor(clampedDeltaY / safeItemHeight)
  const numberOfVisibleItems = getNumberOfVisibleItems(height, safeItemHeight)
  const maxLineY = Math.min(minLineY + numberOfVisibleItems, safeTotalLineCount)
  const scrollBarHeight = getScrollBarHeight(height, contentHeight, minimumSliderSize)
  return {
    deltaY: clampedDeltaY,
    finalDeltaY,
    maxLineY,
    minLineY,
    scrollBarActive: contentHeight > height,
    scrollBarHeight,
  }
}
