import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getErrorStackDom } from '../src/parts/GetErrorStackDom/GetErrorStackDom.ts'

test('getErrorStackDom returns empty dom when stack trace is empty', (): void => {
  const result = getErrorStackDom('')

  expect(result).toEqual([])
})

test('getErrorStackDom renders the stack trace', (): void => {
  const result = getErrorStackDom('Error: file not found\n    at read missing file')

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    text('Error: file not found\n    at read missing file'),
  ])
})
