import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
  return (
    oldState.deltaY === newState.deltaY &&
    oldState.diffScrollBarWidth === newState.diffScrollBarWidth &&
    oldState.diffMode === newState.diffMode &&
    oldState.finalDeltaY === newState.finalDeltaY &&
    oldState.gutterWidthVariable === newState.gutterWidthVariable &&
    oldState.height === newState.height &&
    oldState.itemHeight === newState.itemHeight &&
    oldState.layout === newState.layout &&
    oldState.leftWidth === newState.leftWidth &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.rightWidth === newState.rightWidth &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.totalLineCount === newState.totalLineCount
  )
}
