import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { applyEditInput } from '../ApplyEditInput/ApplyEditInput.ts'

export const insertLineBreak = (state: DiffViewState): Promise<DiffViewState> => {
  return applyEditInput(state, `${state.inputValue}\n`)
}
