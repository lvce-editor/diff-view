import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'
import { handleMouseOut } from '../HandleMouseOut/HandleMouseOut.ts'

export const handleMouseOutAt = (state: DiffViewState, eventX: number, eventY: number): DiffViewState => {
  const index = getIndex(state, eventX, eventY)
  return handleMouseOut(state, index)
}
