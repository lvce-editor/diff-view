import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'

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
  return {
    ...state,
    ...getScrollState(state.height, state.itemHeight, state.totalLineCount, state.minimumSliderSize, nextDeltaY),
  }
}
