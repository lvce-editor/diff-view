import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActionVirtualDom } from '../src/parts/GetActionVirtualDom/GetActionVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MaskIcon from '../src/parts/MaskIcon/MaskIcon.ts'

test('getActionVirtualDom - Button action', () => {
  const action = {
    command: 'test-command',
    icon: MaskIcon.Check,
    id: 'test-action',
    name: InputName.ViewAsTree,
    type: ActionType.Button as 1,
  }
  const result = getActionVirtualDom(action)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.IconButton,
    name: InputName.ViewAsTree,
    title: 'test-action',
    type: VirtualDomElements.Button,
  })
})

test('getActionVirtualDom - unknown action type', () => {
  const action = {
    command: 'test',
    icon: MaskIcon.Check,
    id: 'test',
    name: InputName.ViewAsTree,
    type: 999 as 1,
  }
  const result = getActionVirtualDom(action)
  expect(result).toEqual([])
})
