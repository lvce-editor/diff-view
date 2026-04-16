import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../src/parts/ActionButton/ActionButton.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetActionButtonVirtualDom from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

test('getActionButtonVirtualDom', () => {
  const action: ActionButton = {
    command: 'test-command',
    icon: 'test-icon',
    id: 'test-action',
    label: 'test-label',
  }
  const result = GetActionButtonVirtualDom.getActionButtonVirtualDom(action)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.IconButton,
    name: 'test-label',
    title: 'test-action',
    type: VirtualDomElements.Button,
  })
})
