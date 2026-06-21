import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { applyEditInput } from '../ApplyEditInput/ApplyEditInput.ts'

export const handleInput = async (state: DiffViewState, value: string): Promise<DiffViewState> => {
  return applyEditInput(state, value)
}
