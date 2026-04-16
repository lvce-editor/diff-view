import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
  return oldState.deltaY === newState.deltaY && oldState.maxLineY === newState.maxLineY && oldState.minLineY === newState.minLineY
}
