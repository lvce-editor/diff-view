import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getClampedLeftWidth, getClampedPaneSize, getRemainingPaneSize, getRightWidth } from '../GetPaneWidths/GetPaneWidths.ts'

export const getSashPointerMoveWidths = (state: DiffViewState, clientX: number, clientY: number): { readonly leftWidth: number; readonly rightWidth: number } => {
  const { height, layout, resizeOffsetX, resizeOffsetY, width, x, y } = state
  if (layout === 'vertical') {
    const rawTopHeight = clientY - y - resizeOffsetY
    const leftWidth = getClampedPaneSize(height, rawTopHeight)
    const rightWidth = getRemainingPaneSize(height, leftWidth)
    return {
      leftWidth,
      rightWidth,
    }
  }
  const rawLeftWidth = clientX - x - resizeOffsetX
  const leftWidth = getClampedLeftWidth(width, rawLeftWidth)
  const rightWidth = getRightWidth(width, leftWidth)
  return {
    leftWidth,
    rightWidth,
  }
}

export const handleSashPointerMove = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  const { isResizing } = state
  if (!isResizing) {
    return state
  }
  const { leftWidth, rightWidth } = getSashPointerMoveWidths(state, clientX, clientY)
  return {
    ...state,
    leftWidth,
    rightWidth,
  }
}
