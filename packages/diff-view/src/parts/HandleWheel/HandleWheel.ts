import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'

const getWheelDeltaY = (deltaMode: number, deltaY: number, itemHeight: number, height: number): number => {
  switch (deltaMode) {
    case 1:
      return deltaY * itemHeight
    case 2:
      return deltaY * height
    default:
      return deltaY
  }
}

export const handleWheel = (state: DiffViewState, deltaMode: number, eventDeltaY: number): DiffViewState => {
  const {
    contentLeft,
    contentRight,
    deltaY,
    height,
    inlineChanges,
    itemHeight,
    minimumSliderSize,
    totalLineCount,
    totalLineCountLeft,
    tokenizedLinesLeft,
    totalLineCountRight,
    tokenizedLinesRight,
  } = state
  const nextDeltaY = deltaY + getWheelDeltaY(deltaMode, eventDeltaY, itemHeight, height)
  const scrollState = getScrollState(height, itemHeight, totalLineCount, minimumSliderSize, nextDeltaY)
  const { visibleLinesLeft, visibleLinesRight } = getVisibleLinesState({
    contentLeft,
    contentRight,
    inlineChanges,
    maxLineY: scrollState.maxLineY,
    minLineY: scrollState.minLineY,
    tokenizedLinesLeft,
    totalLineCountLeft,
    totalLineCountRight,
    tokenizedLinesRight,
  })
  return {
    ...state,
    ...scrollState,
    visibleLinesLeft,
    visibleLinesRight,
  }
}
