import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as DiffEditorWhenExpression from '../DiffEditorWhenExpression/DiffEditorWhenExpression.ts'

export const handleClickRightSide = (state: DiffViewState): DiffViewState => {
  return {
    ...state,
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    focusVersion: state.focusVersion + 1,
  }
}
