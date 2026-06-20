import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ActionName from '../ActionName/ActionName.ts'
import { toggleDiffMode } from '../ToggleDiffMode/ToggleDiffMode.ts'

export const handleClickAction = (state: DiffViewState, targetName: string): DiffViewState => {
  if (targetName === ActionName.ToggleDiffMode) {
    return toggleDiffMode(state)
  }
  return state
}
