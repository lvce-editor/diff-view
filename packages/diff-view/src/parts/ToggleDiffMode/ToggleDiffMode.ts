import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { setDiffMode } from '../SetDiffMode/SetDiffMode.ts'

export const toggleDiffMode = (state: DiffViewState): DiffViewState => {
  const nextDiffMode = state.diffMode === 'inline' ? 'side-by-side' : 'inline'
  return setDiffMode(state, nextDiffMode)
}
