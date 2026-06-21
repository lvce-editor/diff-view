import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as DiffEditorWhenExpression from '../DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
import { getCursorPositionFromCoordinates } from '../GetCursorPositionFromCoordinates/GetCursorPositionFromCoordinates.ts'

export const handleClickRightSide = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  const cursorPosition = getCursorPositionFromCoordinates(state, clientX, clientY)
  return setCursorPosition(state, cursorPosition.cursorColumnIndex, cursorPosition.cursorRowIndex)
}
