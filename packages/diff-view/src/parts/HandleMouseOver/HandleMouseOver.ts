import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleMouseOver = async (state: SourceControlState, index: number): Promise<SourceControlState> => {
  const { items } = state
  const item = items[index]
  if (!item) {
    return state
  }
  return {
    ...state,
  }
}
