import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getContentDomWithLineNumbers } from '../src/parts/GetContentDomWithLineNumbers/GetContentDomWithLineNumbers.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('getContentDomWithLineNumbers builds gutter and rows dom with empty line groups', (): void => {
  const rows = [
    {
      childCount: 0,
      className: 'RowA',
      type: VirtualDomElements.Div,
    },
  ]
  const visibleLines = [
    {
      lineNumber: 1,
      tokens: [],
      type: VisibleLineType.Normal,
    },
    {
      lineNumber: -1,
      tokens: [],
      type: VisibleLineType.Normal,
    },
    {
      lineNumber: -1,
      tokens: [],
      type: VisibleLineType.Normal,
    },
    {
      lineNumber: 4,
      tokens: [],
      type: VisibleLineType.Normal,
    },
  ]

  const result = getContentDomWithLineNumbers('CustomContent', visibleLines, 1, rows, 18)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'CustomContent',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
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
      childCount: 0,
      className: ClassNames.DiffEditorLineNumberEmpty,
      style: 'height: 36px;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('4'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    ...rows,
  ])
})
