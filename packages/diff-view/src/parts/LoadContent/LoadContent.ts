import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const loadContent = async (state: DiffViewState, savedState: unknown): Promise<DiffViewState> => {
  return {
    ...state,
  }
}
