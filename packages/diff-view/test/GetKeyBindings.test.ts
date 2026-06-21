import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode, KeyModifier } from '@lvce-editor/virtual-dom-worker'
import * as DiffEditorWhenExpression from '../src/parts/DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
import { getKeyBindings } from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('getKeyBindings includes diff editor editing keybindings', (): void => {
  expect(getKeyBindings()).toEqual([
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
  ])
})
