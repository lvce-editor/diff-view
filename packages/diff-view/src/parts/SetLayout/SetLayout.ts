import type { DiffViewState, Layout } from '../DiffViewState/DiffViewState.ts'
import { getPaneSizes } from '../GetPaneWidths/GetPaneWidths.ts'

const getNextPaneSizes = (state: DiffViewState, layout: Layout): { readonly leftWidth: number; readonly rightWidth: number } => {
  const totalPaneSize = state.leftWidth + state.rightWidth
  const ratio = totalPaneSize === 0 ? 0.5 : state.leftWidth / totalPaneSize
  const size = layout === 'vertical' ? state.height : state.width
  return getPaneSizes(size, ratio)
}

export const setLayout = (state: DiffViewState, layout: Layout): DiffViewState => {
  if (state.layout === layout) {
    return state
  }
  const { leftWidth, rightWidth } = getNextPaneSizes(state, layout)
  return {
    ...state,
    layout,
    leftWidth,
    resizeOffsetX: 0,
    resizeOffsetY: 0,
    rightWidth,
  }
}
