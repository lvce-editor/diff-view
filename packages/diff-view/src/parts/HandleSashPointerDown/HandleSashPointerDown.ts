import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const handleSashPointerDown = (state: DiffViewState, clientX: number): DiffViewState => {
  return {
    ...state,
    isResizing: true,
    resizeOffsetX: clientX - state.x - state.leftWidth,
  }
}