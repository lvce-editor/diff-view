import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
<<<<<<< HEAD
import { getCursorPositionFromCoordinates } from '../GetCursorPositionFromCoordinates/GetCursorPositionFromCoordinates.ts'
=======
import * as DiffEditorWhenExpression from '../DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
>>>>>>> origin/main

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
