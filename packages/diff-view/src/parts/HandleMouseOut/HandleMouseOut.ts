import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const handleMouseOut = (state: DiffViewState, index: number): DiffViewState => {
  const { items } = state
  if (index === -1 || index > items.length) {
    return {
      ...state,
    }
  }
  return state
}
