import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as EmptySourceControlButtons from '../src/parts/EmptySourceControlButtons/EmptySourceControlButton.ts'
import { getButtonsVirtualDom } from '../src/parts/GetButtonsVirtualDom/GetButtonsVirtualDom.ts'

test('empty buttons', () => {
  const result = getButtonsVirtualDom(EmptySourceControlButtons.emptySourceControlButtons)
  expect(result).toEqual([])
})

test('non-empty buttons', () => {
  const buttons = [
    {
      command: 'test-command',
      icon: 'test-icon',
      label: 'Test',
    },
  ]
  const result = getButtonsVirtualDom(buttons)
  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.SourceControlButtons,
      type: VirtualDomElements.Div,
    },
    {
      ariaLabel: 'Test',
      childCount: 1,
      className: ClassNames.SourceControlButton,
      name: 'Test',
      title: 'Test',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIcontest-icon',
      role: 'none',
      type: VirtualDomElements.Span,
    },
  ])
})
