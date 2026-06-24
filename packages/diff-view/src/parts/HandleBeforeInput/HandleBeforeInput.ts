import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { applyEditInput } from '../ApplyEditInput/ApplyEditInput.ts'

export const handleBeforeInput = async (state: DiffViewState, inputType: string, data: string): Promise<DiffViewState> => {
  switch (inputType) {
    case 'insertText': {
      const newInputValue = `${state.inputValue ?? ''}${data ?? ''}`
      return applyEditInput(state, newInputValue)
    }
    default:
      return state
  }
}
