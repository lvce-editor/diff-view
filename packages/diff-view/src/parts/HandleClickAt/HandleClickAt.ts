import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'
import { handleClickSourceControlButtons } from '../HandleClickSourceControlButtons/HandleClickSourceControlButtons.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const handleClickAt = async (state: DiffViewState, eventX: number, eventY: number, name: string): Promise<DiffViewState> => {
  const index = getIndex(state, eventX, eventY)
  if (name) {
    return handleClickSourceControlButtons(state, index, name)
  }
  return SelectIndex.selectIndex(state, index)
}
