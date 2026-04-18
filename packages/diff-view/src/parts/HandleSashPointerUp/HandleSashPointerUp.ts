import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getSashPointerMoveWidths } from '../HandleSashPointerMove/HandleSashPointerMove.ts'

export const handleSashPointerUp = (state: DiffViewState, clientX: number): DiffViewState => {
  if (!state.isResizing) {
    return state
  }
  const { leftWidth, rightWidth } = getSashPointerMoveWidths(state, clientX)
  return {
    ...state,
    isResizing: false,
    leftWidth,
    resizeOffsetX: 0,
    rightWidth,
  }
}