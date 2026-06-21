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
  const rawCursorColumnIndex = Math.floor((clientX - contentLeft - gutterWidth - CursorConstants.RowPaddingLeft) / CursorConstants.CharWidth)
  const rawCursorRowIndex = state.minLineY + Math.floor((clientY - contentTop) / CursorConstants.LineHeight)
  return {
    cursorColumnIndex: Math.max(rawCursorColumnIndex, 0),
    cursorRowIndex: Math.max(rawCursorRowIndex, 0),
  }
}
