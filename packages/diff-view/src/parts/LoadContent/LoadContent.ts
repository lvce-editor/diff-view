import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const loadContent = async (state: DiffViewState, savedState: unknown): Promise<DiffViewState> => {
  return {
    ...state,
    deltaY: 10,
    initial: false,
    minLineY: 10,
  }
}
