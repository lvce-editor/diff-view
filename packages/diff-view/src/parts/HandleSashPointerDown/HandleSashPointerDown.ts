import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const handleSashPointerDown = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  const isVertical = state.layout === 'vertical'
  return {
    ...state,
    isResizing: true,
    resizeOffsetX: isVertical ? 0 : clientX - state.x - state.leftWidth,
    resizeOffsetY: isVertical ? clientY - state.y - state.leftWidth : 0,
  }
}
