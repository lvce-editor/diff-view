import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getClampedLeftWidth, getRightWidth } from '../GetPaneWidths/GetPaneWidths.ts'

export const getSashPointerMoveWidths = (state: DiffViewState, clientX: number): { readonly leftWidth: number; readonly rightWidth: number } => {
  const rawLeftWidth = clientX - state.x - state.resizeOffsetX
  const leftWidth = getClampedLeftWidth(state.width, rawLeftWidth)
  const rightWidth = getRightWidth(state.width, leftWidth)
  return {
    leftWidth,
    rightWidth,
  }
}

export const handleSashPointerMove = (state: DiffViewState, clientX: number): DiffViewState => {
  if (!state.isResizing) {
    return state
  }
  const { leftWidth, rightWidth } = getSashPointerMoveWidths(state, clientX)
  return {
    ...state,
    leftWidth,
    rightWidth,
  }
}
