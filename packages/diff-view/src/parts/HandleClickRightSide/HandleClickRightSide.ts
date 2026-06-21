import { WhenExpression } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getCursorPositionFromCoordinates } from '../GetCursorPositionFromCoordinates/GetCursorPositionFromCoordinates.ts'

export const handleClickRightSide = (state: DiffViewState, clientX: number, clientY: number): DiffViewState => {
  const cursorPosition = getCursorPositionFromCoordinates(state, clientX, clientY)
  return {
    ...state,
    focus: WhenExpression.FocusEditorText,
    focusVersion: state.focusVersion + 1,
    rightEditor: {
      ...state.rightEditor,
      ...cursorPosition,
    },
  }
}
