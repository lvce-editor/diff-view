import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode, KeyModifier } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as DiffEditorWhenExpression from '../DiffEditorWhenExpression/DiffEditorWhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'Source Control.acceptInput',
      key: KeyModifier.CtrlCmd | KeyCode.Enter,
      when: WhenExpression.FocusSourceControlInput,
    },
    {
      command: 'DiffView.insertLineBreak',
      key: KeyCode.Enter,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
    {
      command: 'DiffView.deleteLeft',
      key: KeyCode.Backspace,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
    {
      command: 'DiffView.deleteRight',
      key: KeyCode.Delete,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
  ]
}
