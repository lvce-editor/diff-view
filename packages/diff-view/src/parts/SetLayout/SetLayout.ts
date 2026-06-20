import type { DiffViewState, Layout } from '../DiffViewState/DiffViewState.ts'
import { getNextPaneSizes } from '../GetNextPaneSizes/GetNextPaneSizes.ts'

export const setLayout = (state: DiffViewState, layout: Layout): DiffViewState => {
  if (state.layout === layout) {
    return state
  }
  const { leftWidth, rightWidth } = getNextPaneSizes(state, layout, state.width, state.height)
  return {
    ...state,
    layout,
    leftWidth,
    resizeOffsetX: 0,
    resizeOffsetY: 0,
    rightWidth,
  }
}
