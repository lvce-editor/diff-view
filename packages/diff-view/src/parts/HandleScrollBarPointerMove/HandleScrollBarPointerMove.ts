import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getDeltaYFromScrollBarThumbTop } from '../GetDeltaYFromScrollBarThumbTop/GetDeltaYFromScrollBarThumbTop.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'

export const handleScrollBarPointerMove = (state: DiffViewState, clientY: number): DiffViewState => {
  if (!state.isScrollBarDragging) {
    return state
  }
  const thumbTop = clientY - state.y - state.scrollBarDragOffsetY
  const deltaY = getDeltaYFromScrollBarThumbTop(state.height, state.scrollBarHeight, thumbTop, state.finalDeltaY)
  return {
    ...state,
    ...getScrollState(state.height, state.itemHeight, state.totalLineCount, state.minimumSliderSize, deltaY),
  }
}
