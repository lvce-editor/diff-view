import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getDeltaYFromScrollBarThumbTop } from '../GetDeltaYFromScrollBarThumbTop/GetDeltaYFromScrollBarThumbTop.ts'
import { getScrollBarThumbTop } from '../GetScrollBarThumbTop/GetScrollBarThumbTop.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'

const normalizeFloatingPointError = (value: number): number => {
  return Number(value.toPrecision(16))
}

export const handleScrollBarPointerDown = (state: DiffViewState, clientY: number): DiffViewState => {
  if (!state.scrollBarActive) {
    return state
  }
  const thumbTop = getScrollBarThumbTop(state.height, state.scrollBarHeight, state.deltaY, state.finalDeltaY)
  const relativeY = clientY - state.y
  const isThumbPointerDown = relativeY >= thumbTop && relativeY <= thumbTop + state.scrollBarHeight
  if (!isThumbPointerDown) {
    const nextThumbTop = relativeY - state.scrollBarHeight / 2
    const deltaY = getDeltaYFromScrollBarThumbTop(state.height, state.scrollBarHeight, nextThumbTop, state.finalDeltaY)
    const scrollState = getScrollState(state.height, state.itemHeight, state.totalLineCount, state.minimumSliderSize, deltaY)
    const nextThumbTopAfterClamp = getScrollBarThumbTop(state.height, state.scrollBarHeight, scrollState.deltaY, state.finalDeltaY)
    return {
      ...state,
      ...scrollState,
      isScrollBarDragging: true,
      scrollBarDragOffsetY: normalizeFloatingPointError(relativeY - nextThumbTopAfterClamp),
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
  return {
    ...state,
    isScrollBarDragging: true,
    scrollBarDragOffsetY: normalizeFloatingPointError(relativeY - thumbTop),
  }
}
