import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const setFontFamily = (state: DiffViewState, fontFamily: string): DiffViewState => {
  if (state.fontFamily === fontFamily) {
    return state
  }

  return {
    ...state,
    fontFamily,
  }
}
