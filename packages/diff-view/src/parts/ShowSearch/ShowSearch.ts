import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const showSearch = (state: DiffViewState): DiffViewState => {
  return {
    ...state,
    searchVisible: true,
  }
}
