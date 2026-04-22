import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getErrorStackDom } from '../src/parts/GetErrorStackDom/GetErrorStackDom.ts'

test('getErrorStackDom returns empty dom when stack trace is empty', (): void => {
  const result = getErrorStackDom('')

  expect(result).toEqual([])
})

test('getErrorStackDom renders the stack trace', (): void => {
  const result = getErrorStackDom('Error: file not found\n    at read missing file (/tmp/missing-file.js:12:34)')

  expect(result).toEqual([
    {
      childCount: 2,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStackLine,
      type: VirtualDomElements.Div,
    },
    text('Error: file not found'),
    {
      childCount: 2,
      className: ClassNames.DiffEditorErrorStackLine,
      type: VirtualDomElements.Div,
    },
    text('    at read missing file '),
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStackLink,
      href: 'file:///tmp/missing-file.js',
      rel: 'noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text('(missing-file.js)'),
  ])
})

test('getErrorStackDom blocks disallowed link schemes', (): void => {
  const result = getErrorStackDom('Error: unsafe link\n    at read suspicious file (javascript://example.com/evil.js:12:34)')

  expect(result).toEqual([
    {
      childCount: 2,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStackLine,
      type: VirtualDomElements.Div,
    },
    text('Error: unsafe link'),
    {
      childCount: 2,
      className: ClassNames.DiffEditorErrorStackLine,
      type: VirtualDomElements.Div,
    },
    text('    at read suspicious file '),
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStackLink,
      href: '#',
      rel: 'noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text('(evil.js)'),
  ])
})
