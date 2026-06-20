import type { DiffViewState, Layout } from '../DiffViewState/DiffViewState.ts'
import { getPaneSizes } from '../GetPaneWidths/GetPaneWidths.ts'

export const getNextPaneSizes = (
  state: DiffViewState,
  layout: Layout,
  width: number,
  height: number,
): { readonly leftWidth: number; readonly rightWidth: number } => {
  const totalPaneSize = state.leftWidth + state.rightWidth
  const ratio = totalPaneSize === 0 ? 0.5 : state.leftWidth / totalPaneSize
  const size = layout === 'vertical' ? height : width
  return getPaneSizes(size, ratio)
}
