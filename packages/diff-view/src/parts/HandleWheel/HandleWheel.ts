import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'
import { getWheelDeltaY } from '../GetWheelDeltaY/GetWheelDeltaY.ts'

export const handleWheel = (state: DiffViewState, deltaMode: number, eventDeltaY: number): DiffViewState => {
  if (!state.scrollBarActive) {
    return state
  }
  const {
    contentLeft,
    contentRight,
    deltaY,
    height,
    inlineChanges,
    itemHeight,
    minimumSliderSize,
    tokenizedLinesLeft,
    tokenizedLinesRight,
    totalLineCount,
    totalLineCountLeft,
    totalLineCountRight,
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
    tokenizedLinesRight,
    totalLineCountLeft,
    totalLineCountRight,
  })
  return {
    ...state,
    ...scrollState,
    visibleLinesLeft,
    visibleLinesRight,
  }
}
