import { ViewletCommand, WhenExpression } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const renderFocus = (oldState: DiffViewState, newState: DiffViewState): readonly any[] => {
  if (newState.focus !== WhenExpression.FocusEditorText) {
    return []
  }
  return [ViewletCommand.FocusSelector, newState.id, '.DiffEditorInput']
}
