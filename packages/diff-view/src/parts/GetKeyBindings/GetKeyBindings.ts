import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import * as DiffEditorWhenExpression from '../DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
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
    {
      command: 'DiffView.moveCursorLeft',
      key: KeyCode.LeftArrow,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
    {
      command: 'DiffView.moveCursorRight',
      key: KeyCode.RightArrow,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
    {
      command: 'DiffView.moveCursorUp',
      key: KeyCode.UpArrow,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
    {
      command: 'DiffView.moveCursorDown',
      key: KeyCode.DownArrow,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
    {
      command: 'DiffView.moveCursorToStartOfLine',
      key: KeyCode.Home,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
    {
      command: 'DiffView.moveCursorToEndOfLine',
      key: KeyCode.End,
      when: DiffEditorWhenExpression.FocusDiffEditorText,
    },
  ]
}
