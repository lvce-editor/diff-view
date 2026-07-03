import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { defaultAllowedLinkSchemes } from '../src/parts/AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentRightDom } from '../src/parts/GetContentRightDom/GetContentRightDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

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
      childCount: 2,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.DiffEditorContentRight}`,
      onClick: DomEventListenerFunctions.HandleClickRightSide,
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

test('getContentRightDom renders cursor for editable right content', (): void => {
  const result = getContentRightDom({
    allowedLinkSchemes: defaultAllowedLinkSchemes,
    contentRight: 'after-content',
    editable: true,
    lineNumbers: true,
    maxLineY: 1,
    minLineY: 1,
    totalLineCount: 1,
    visibleLines: [
      {
        lineNumber: 1,
        tokens: [{ text: 'after-content', type: '' }],
        type: VisibleLineType.Normal,
      },
    ],
  })

  expect(result).toEqual([
    {
      childCount: 4,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.DiffEditorContentRight}`,
      onClick: DomEventListenerFunctions.HandleClickRightSide,
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
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('after-content'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorSelections,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.EditorCursor} ${ClassNames.EditorCursorRight}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorInputWrapper,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorInput,
      name: InputName.DiffEditorInput,
      onInput: DomEventListenerFunctions.HandleInput,
      selectionEnd: 0,
      selectionStart: 0,
      type: VirtualDomElements.TextArea,
      value: '',
    },
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
      className: `${ClassNames.DiffEditorContent} ${ClassNames.DiffEditorContentRight} ${ClassNames.DiffEditorError}`,
      onClick: DomEventListenerFunctions.HandleClickRightSide,
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
      childCount: 2,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.DiffEditorContentRight}`,
      onClick: DomEventListenerFunctions.HandleClickRightSide,
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
      className: `${ClassNames.DiffEditorLineNumber} ${ClassNames.DiffEditorLineNumberInsertion}`,
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
      childCount: 2,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.DiffEditorContentRight}`,
      onClick: DomEventListenerFunctions.HandleClickRightSide,
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
