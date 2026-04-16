import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode, KeyModifier } from '@lvce-editor/virtual-dom-worker'
import { getKeyBindings } from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('getKeyBindings returns expected key bindings', (): void => {
  const result = getKeyBindings()
  expect(result).toEqual([
    {
      command: 'Source Control.acceptInput',
      key: KeyModifier.CtrlCmd | KeyCode.Enter,
      when: WhenExpression.FocusSourceControlInput,
    },
  ])
})
