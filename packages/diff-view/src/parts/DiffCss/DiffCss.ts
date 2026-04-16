import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
  return oldState.inputBoxHeight === newState.inputBoxHeight
}
