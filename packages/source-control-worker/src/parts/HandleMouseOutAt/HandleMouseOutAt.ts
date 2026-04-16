import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'
import { handleMouseOut } from '../HandleMouseOut/HandleMouseOut.ts'

export const handleMouseOutAt = (state: SourceControlState, eventX: number, eventY: number): SourceControlState => {
  const index = getIndex(state, eventX, eventY)
  return handleMouseOut(state, index)
}
