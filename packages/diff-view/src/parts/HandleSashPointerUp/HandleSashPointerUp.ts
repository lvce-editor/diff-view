import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getSashPointerMoveWidths } from '../HandleSashPointerMove/HandleSashPointerMove.ts'

export const handleSashPointerUp = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  if (!state.isResizing) {
    return state
  }
  const { leftWidth, rightWidth } = getSashPointerMoveWidths(state, clientX, clientY)
  return {
    ...state,
    isResizing: false,
    leftWidth,
    resizeOffsetX: 0,
    resizeOffsetY: 0,
    rightWidth,
  }
}
