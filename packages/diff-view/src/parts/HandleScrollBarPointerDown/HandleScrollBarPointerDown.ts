import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getScrollBarThumbTop } from '../GetScrollBarThumbTop/GetScrollBarThumbTop.ts'

const normalizeFloatingPointError = (value: number): number => {
  return Number(value.toPrecision(16))
}

export const handleScrollBarPointerDown = (state: DiffViewState, clientY: number): DiffViewState => {
  if (!state.scrollBarActive) {
    return state
  }
  const thumbTop = getScrollBarThumbTop(state.height, state.scrollBarHeight, state.deltaY, state.finalDeltaY)
  return {
    ...state,
    isScrollBarDragging: true,
    scrollBarDragOffsetY: normalizeFloatingPointError(clientY - state.y - thumbTop),
  }
}
