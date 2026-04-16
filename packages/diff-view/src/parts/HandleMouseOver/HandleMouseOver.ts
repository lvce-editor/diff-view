import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const handleMouseOver = async (state: DiffViewState, index: number): Promise<DiffViewState> => {
  const { items } = state
  const item = items[index]
  if (!item) {
    return state
  }
  return {
    ...state,
  }
}
