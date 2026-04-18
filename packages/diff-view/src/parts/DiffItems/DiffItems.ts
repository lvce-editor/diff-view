import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
  return (
    oldState.deltaY === newState.deltaY &&
    oldState.diffMode === newState.diffMode &&
    oldState.lineNumbers === newState.lineNumbers &&
    oldState.layout === newState.layout &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY
  )
}
