import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const handleClick = async (state: DiffViewState, index: number): Promise<DiffViewState> => {
  return SelectIndex.selectIndex(state, index)
}
