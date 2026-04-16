import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const handleClick = async (state: SourceControlState, index: number): Promise<SourceControlState> => {
  return SelectIndex.selectIndex(state, index)
}
