import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getClampedLeftWidth, getClampedPaneSize, getRemainingPaneSize, getRightWidth } from '../GetPaneWidths/GetPaneWidths.ts'

export const getSashPointerMoveWidths = (state: DiffViewState, clientX: number, clientY: number): { readonly leftWidth: number; readonly rightWidth: number } => {
  if (state.layout === 'vertical') {
    const rawTopHeight = clientY - state.y - state.resizeOffsetY
    const leftWidth = getClampedPaneSize(state.height, rawTopHeight)
    const rightWidth = getRemainingPaneSize(state.height, leftWidth)
    return {
      leftWidth,
      rightWidth,
    }
  }
  const rawLeftWidth = clientX - state.x - state.resizeOffsetX
  const leftWidth = getClampedLeftWidth(state.width, rawLeftWidth)
  const rightWidth = getRightWidth(state.width, leftWidth)
  return {
    leftWidth,
    rightWidth,
  }
}

export const handleSashPointerMove = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  if (!state.isResizing) {
    return state
  }
  const { leftWidth, rightWidth } = getSashPointerMoveWidths(state, clientX, clientY)
  return {
    ...state,
    leftWidth,
    rightWidth,
  }
}
