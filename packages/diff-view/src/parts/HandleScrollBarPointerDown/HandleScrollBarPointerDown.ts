import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getScrollBarThumbTop } from '../GetScrollBarThumbTop/GetScrollBarThumbTop.ts'

export const handleScrollBarPointerDown = (state: DiffViewState, clientY: number): DiffViewState => {
  if (!state.scrollBarActive) {
    return state
  }
  const thumbTop = getScrollBarThumbTop(state.height, state.scrollBarHeight, state.deltaY, state.finalDeltaY)
  return {
    ...state,
    isScrollBarDragging: true,
    scrollBarDragOffsetY: clientY - state.y - thumbTop,
  }
}
