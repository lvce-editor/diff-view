import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
<<<<<<< HEAD
  return (
    oldState.deltaY === newState.deltaY &&
    oldState.finalDeltaY === newState.finalDeltaY &&
    oldState.height === newState.height &&
    oldState.itemHeight === newState.itemHeight &&
    oldState.leftWidth === newState.leftWidth &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.rightWidth === newState.rightWidth &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.totalLineCount === newState.totalLineCount
  )
=======
  return oldState.layout === newState.layout && oldState.leftWidth === newState.leftWidth && oldState.rightWidth === newState.rightWidth
>>>>>>> origin/main
}
