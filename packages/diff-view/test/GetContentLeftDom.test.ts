import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getContentLeftDom } from '../src/parts/GetContentLeftDom/GetContentLeftDom.ts'

test('getContentLeftDom renders each left line inside an EditorRow', (): void => {
  const result = getContentLeftDom('before-content\nsecond-line', '', '', true, 2, 0, 2)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('2'),
    {
      childCount: 4,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('before-content'),
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('second-line'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getContentLeftDom omits the gutter when line numbers are disabled', (): void => {
  const result = getContentLeftDom('before-content\nsecond-line', '', '', false, 2, 0, 2)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('before-content'),
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('second-line'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getContentLeftDom renders load errors when available', (): void => {
  const result = getContentLeftDom('', 'file not found', 'Error: file not found\n    at read missing file (/tmp/missing-file.js:12:34)')

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
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      href: 'file:///tmp/missing-file.js',
      rel: 'noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text('    at read missing file (/tmp/missing-file.js:12:34)'),
  ])
})

test('getContentLeftDom renders paired deletion and insertion on the same row', (): void => {
  const result = getContentLeftDom('shared-line\ndeleted-line', '', '', true, 2, 0, 2, [
    { leftIndex: 0, rightIndex: 0, type: 0 },
    { leftIndex: 1, rightIndex: 1, type: 2 },
    { leftIndex: 1, rightIndex: 1, type: 1 },
  ])

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('2'),
    {
      childCount: 4,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('shared-line'),
    {
      childCount: 1,
      className: ClassNames.EditorRowDeletion,
      type: VirtualDomElements.Div,
    },
    text('deleted-line'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getContentLeftDom renders syntax-highlighted token spans', (): void => {
  const result = getContentLeftDom('const answer = 1', '', '', true, 1, 0, 1, [], [['const', 'Token Keyword', ' answer = 1', 'Token Text']])

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1'),
    {
      childCount: 3,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Token Keyword',
      type: VirtualDomElements.Span,
    },
    text('const'),
    {
      childCount: 1,
      className: 'Token Text',
      type: VirtualDomElements.Span,
    },
    text(' answer = 1'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})
