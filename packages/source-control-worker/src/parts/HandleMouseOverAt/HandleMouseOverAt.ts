import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'
import { handleMouseOver } from '../HandleMouseOver/HandleMouseOver.ts'

export const handleMouseOverAt = async (state: SourceControlState, eventX: number, eventY: number): Promise<SourceControlState> => {
  const index = getIndex(state, eventX, eventY)
  return handleMouseOver(state, index)
}
