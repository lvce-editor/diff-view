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

export const handleWheel = (state: DiffViewState, deltaMode: number, deltaY: number): DiffViewState => {
  const nextDeltaY = state.deltaY + getWheelDeltaY(deltaMode, deltaY, state.itemHeight, state.height)
  const scrollState = getScrollState(state.height, state.itemHeight, state.totalLineCount, state.minimumSliderSize, nextDeltaY)
  return {
    ...state,
    ...scrollState,
    ...getVisibleLinesState({
      contentLeft: state.contentLeft,
      contentRight: state.contentRight,
      inlineChanges: state.inlineChanges,
      maxLineY: scrollState.maxLineY,
      minLineY: scrollState.minLineY,
      tokenizedLinesLeft: state.tokenizedLinesLeft,
      tokenizedLinesRight: state.tokenizedLinesRight,
      totalLineCountLeft: state.totalLineCountLeft,
      totalLineCountRight: state.totalLineCountRight,
    }),
  }
}
