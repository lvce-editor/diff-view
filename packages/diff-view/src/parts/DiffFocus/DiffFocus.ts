import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
  return oldState.focus === newState.focus
}
