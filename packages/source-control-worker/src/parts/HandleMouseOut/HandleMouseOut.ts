import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleMouseOut = (state: SourceControlState, index: number): SourceControlState => {
  const { items } = state
  if (index === -1 || index > items.length) {
    return {
      ...state,
    }
  }
  return state
}
