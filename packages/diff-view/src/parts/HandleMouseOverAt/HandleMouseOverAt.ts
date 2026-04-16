import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'
import { handleMouseOver } from '../HandleMouseOver/HandleMouseOver.ts'

export const handleMouseOverAt = async (state: DiffViewState, eventX: number, eventY: number): Promise<DiffViewState> => {
  const index = getIndex(state, eventX, eventY)
  return handleMouseOver(state, index)
}
