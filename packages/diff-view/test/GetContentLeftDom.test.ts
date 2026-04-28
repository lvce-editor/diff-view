import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { defaultAllowedLinkSchemes } from '../src/parts/AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getContentLeftDom } from '../src/parts/GetContentLeftDom/GetContentLeftDom.ts'

test('getContentLeftDom renders each left line inside an EditorRow', (): void => {
  const result = getContentLeftDom({
    allowedLinkSchemes: defaultAllowedLinkSchemes,
    contentLeft: 'before-content\nsecond-line',
    lineNumbers: true,
    maxLineY: 2,
    minLineY: 0,
    totalLineCount: 2,
  })

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
      childCount: 2,
      className: ClassNames.DiffEditorRows,
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
  ])
})

test('getContentLeftDom omits the gutter when line numbers are disabled', (): void => {
  const result = getContentLeftDom({
    allowedLinkSchemes: defaultAllowedLinkSchemes,
    contentLeft: 'before-content\nsecond-line',
    lineNumbers: false,
    maxLineY: 2,
    minLineY: 0,
    totalLineCount: 2,
  })

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
  ])
})

test('getContentLeftDom renders load errors when available', (): void => {
  const result = getContentLeftDom({
    contentLeft: '',
    errorMessage: 'file not found',
    errorStack: 'Error: file not found\n    at read missing file (/tmp/missing-file.js:12:34)',
  })

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

test('getContentLeftDom renders paired deletion and insertion on the same row', (): void => {
  const result = getContentLeftDom({
    allowedLinkSchemes: defaultAllowedLinkSchemes,
    contentLeft: 'shared-line\ndeleted-line',
    inlineChanges: [
      { leftIndex: 0, rightIndex: 0, type: 0 },
      { leftIndex: 1, rightIndex: 1, type: 2 },
      { leftIndex: 1, rightIndex: 1, type: 1 },
    ],
    lineNumbers: true,
    maxLineY: 2,
    minLineY: 0,
    totalLineCount: 2,
  })

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
      childCount: 2,
      className: ClassNames.DiffEditorRows,
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
  ])
})

test('getContentLeftDom renders syntax-highlighted token spans', (): void => {
  const result = getContentLeftDom({
    allowedLinkSchemes: defaultAllowedLinkSchemes,
    contentLeft: 'const answer = 1',
    inlineChanges: [],
    lineNumbers: true,
    maxLineY: 1,
    minLineY: 0,
    tokenizedLines: [['const', 'Token Keyword', ' answer = 1', 'Token Text']],
    totalLineCount: 1,
  })

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
      childCount: 1,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
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
  ])
})
