import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { defaultAllowedLinkSchemes } from '../src/parts/AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getContentRightDom } from '../src/parts/GetContentRightDom/GetContentRightDom.ts'

test('getContentRightDom renders each right line inside an EditorRow', (): void => {
  const result = getContentRightDom({
    allowedLinkSchemes: defaultAllowedLinkSchemes,
    contentRight: 'after-content\nsecond-line',
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
      className: ClassNames.DiffEditorContentRight,
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
    text('after-content'),
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('second-line'),
  ])
})

test('getContentRightDom renders load errors when available', (): void => {
  const result = getContentRightDom({
    contentRight: '',
    errorMessage: 'permission denied',
  })

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

test('getContentRightDom renders paired deletion and insertion on the same row', (): void => {
  const result = getContentRightDom({
    allowedLinkSchemes: defaultAllowedLinkSchemes,
    contentRight: 'shared-line\nadded-line',
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
      className: ClassNames.DiffEditorContentRight,
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
      className: ClassNames.EditorRowInsertion,
      type: VirtualDomElements.Div,
    },
    text('added-line'),
  ])
})

test('getContentRightDom renders syntax-highlighted token spans', (): void => {
  const result = getContentRightDom({
    allowedLinkSchemes: defaultAllowedLinkSchemes,
    contentRight: 'const answer = 1',
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
      className: ClassNames.DiffEditorContentRight,
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
