import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return oldState.focus === newState.focus
}
