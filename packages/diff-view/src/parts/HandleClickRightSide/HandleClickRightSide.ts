import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as DiffEditorWhenExpression from '../DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
import { getCursorPositionFromCoordinates } from '../GetCursorPositionFromCoordinates/GetCursorPositionFromCoordinates.ts'
import { setCursorPosition } from '../SetCursorPosition/SetCursorPosition.ts'

export const handleClickRightSide = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  const cursorPosition = getCursorPositionFromCoordinates(state, clientX, clientY)
  const focusedState = {
    ...state,
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    focusVersion: state.focusVersion + 1,
  }
  return setCursorPosition(focusedState, cursorPosition.cursorColumnIndex, cursorPosition.cursorRowIndex)
}
