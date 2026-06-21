import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const handleSashPointerDown = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  const { layout, leftWidth, x, y } = state
  const isVertical = layout === 'vertical'
  return {
    ...state,
    isResizing: true,
    resizeOffsetX: isVertical ? 0 : clientX - x - leftWidth,
    resizeOffsetY: isVertical ? clientY - y - leftWidth : 0,
  }
}
