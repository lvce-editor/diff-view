import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as CursorConstants from '../CursorConstants/CursorConstants.ts'

export interface CursorPosition {
  readonly cursorColumnIndex: number
  readonly cursorRowIndex: number
}

export const getCursorPositionFromCoordinates = (state: DiffViewState, clientX: number, clientY: number): CursorPosition => {
  const contentLeft = state.layout === 'vertical' ? state.x : state.x + state.leftWidth
  const contentTop = state.layout === 'vertical' ? state.y + state.leftWidth : state.y
  const gutterWidth = state.lineNumbers ? state.gutterWidthVariable + CursorConstants.GutterPaddingWidth : 0
  const charWidth = CursorConstants.getCharWidth(state)
  const rawCursorColumnIndex = Math.floor((clientX - contentLeft - gutterWidth - CursorConstants.RowPaddingLeft) / charWidth)
  const rawCursorRowIndex = state.minLineY + Math.floor((clientY - contentTop) / CursorConstants.LineHeight)
  const maxCursorRowIndex = Math.max(state.totalLineCountRight - 1, 0)
  return {
    cursorColumnIndex: Math.max(rawCursorColumnIndex, 0),
    cursorRowIndex: Math.min(Math.max(rawCursorRowIndex, 0), maxCursorRowIndex),
  }
}
