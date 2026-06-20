import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const toggleWhitespace = (state: DiffViewState): DiffViewState => {
  return {
    ...state,
    showWhitespace: !state.showWhitespace,
  }
}
