import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as DiffEditorWhenExpression from '../DiffEditorWhenExpression/DiffEditorWhenExpression.ts'

export const renderFocus = (oldState: DiffViewState, newState: DiffViewState): readonly any[] => {
  if (newState.focus !== DiffEditorWhenExpression.FocusDiffEditorText) {
    return []
  }
  return [ViewletCommand.FocusSelector, newState.id, '.DiffEditorInput']
}
