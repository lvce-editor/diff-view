import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
  return (
    oldState.allGroups === newState.allGroups &&
    oldState.deltaY === newState.deltaY &&
    oldState.items === newState.items &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.visibleItems === newState.visibleItems
  )
}
