import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const handleSearchInput = async (state: DiffViewState, value: string): Promise<DiffViewState> => {
  return {
    ...state,
    searchQuery: value,
    leftEditor: {
      ...state.leftEditor,
      searchQuery: value,
    },
    rightEditor: {
      ...state.rightEditor,
      searchQuery: value,
    },
  }
}
