import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { applyEditInput } from '../ApplyEditInput/ApplyEditInput.ts'

export const deleteLeft = (state: DiffViewState): Promise<DiffViewState> => {
  if (!state.inputValue) {
    return Promise.resolve(state)
  }
  return applyEditInput(state, state.inputValue.slice(0, -1))
}
