import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getErrorDom } from '../src/parts/GetErrorDom/GetErrorDom.ts'

test('getErrorDom renders an error message without a stack trace', (): void => {
  const result = getErrorDom(ClassNames.DiffEditorContentRight, 'permission denied', '')

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: `${ClassNames.DiffEditorContentRight} ${ClassNames.DiffEditorError}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorMessage,
      type: VirtualDomElements.Div,
    },
    text('permission denied'),
  ])
})

test('getErrorDom renders an error message and stack trace', (): void => {
  const result = getErrorDom(ClassNames.DiffEditorContentLeft, 'file not found', 'Error: file not found\n    at read missing file (/tmp/missing-file.js:12:34)')

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: `${ClassNames.DiffEditorContentLeft} ${ClassNames.DiffEditorError}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorMessage,
      type: VirtualDomElements.Div,
    },
    text('file not found'),
    {
      childCount: 2,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    text('Error: file not found'),
    {
      childCount: 2,
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

test('getErrorDom applies the allowed link scheme allowlist', (): void => {
  const result = getErrorDom(ClassNames.DiffEditorContentLeft, 'file not found', 'Error: file not found\n    at read missing file (/tmp/missing-file.js:12:34)', [
    'https',
  ])

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: `${ClassNames.DiffEditorContentLeft} ${ClassNames.DiffEditorError}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorMessage,
      type: VirtualDomElements.Div,
    },
    text('file not found'),
    {
      childCount: 2,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    text('Error: file not found'),
    {
      childCount: 2,
      type: VirtualDomElements.Div,
    },
    text('    at read missing file '),
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStackLink,
      href: '#',
      rel: 'noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text('(missing-file.js)'),
  ])
})
