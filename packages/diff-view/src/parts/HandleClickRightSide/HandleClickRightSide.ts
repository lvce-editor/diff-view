import { WhenExpression } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const handleClickRightSide = (state: DiffViewState): DiffViewState => {
  return {
    ...state,
    focus: WhenExpression.FocusEditorText,
    focusVersion: state.focusVersion + 1,
  }
}
