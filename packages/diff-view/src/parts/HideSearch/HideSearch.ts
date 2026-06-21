import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const hideSearch = (state: DiffViewState): DiffViewState => {
  return {
    ...state,
    searchVisible: false,
  }
}
