import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
  return (
    oldState.contentLeft === newState.contentLeft &&
    oldState.contentRight === newState.contentRight &&
    oldState.deltaY === newState.deltaY &&
    oldState.diffMode === newState.diffMode &&
    oldState.finalDeltaY === newState.finalDeltaY &&
    oldState.gutterWidthVariable === newState.gutterWidthVariable &&
    oldState.height === newState.height &&
    oldState.inlineChanges === newState.inlineChanges &&
    oldState.itemHeight === newState.itemHeight &&
    oldState.layout === newState.layout &&
    oldState.leftWidth === newState.leftWidth &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.rightEditor.cursorColumnIndex === newState.rightEditor.cursorColumnIndex &&
    oldState.rightEditor.cursorRowIndex === newState.rightEditor.cursorRowIndex &&
    oldState.rightWidth === newState.rightWidth &&
    oldState.scrollBarBackgroundImage === newState.scrollBarBackgroundImage &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.totalLineCount === newState.totalLineCount
  )
}
