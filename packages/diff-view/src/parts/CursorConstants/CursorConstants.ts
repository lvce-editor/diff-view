import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

const DefaultCharWidth = 9
export const LineHeight = 20
export const GutterPaddingWidth = 20
export const RowPaddingLeft = 12

export const getCharWidth = (state: DiffViewState): number => {
  return state.charWidth ?? DefaultCharWidth
}
