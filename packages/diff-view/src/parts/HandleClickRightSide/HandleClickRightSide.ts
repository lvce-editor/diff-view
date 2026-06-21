import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as DiffEditorWhenExpression from '../DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
import { getCursorPositionFromCoordinates } from '../GetCursorPositionFromCoordinates/GetCursorPositionFromCoordinates.ts'

export const handleClickRightSide = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  const cursorPosition = getCursorPositionFromCoordinates(state, clientX, clientY)
  return {
    ...state,
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    focusVersion: state.focusVersion + 1,
    rightEditor: {
      ...state.rightEditor,
      ...cursorPosition,
    },
  }
}
