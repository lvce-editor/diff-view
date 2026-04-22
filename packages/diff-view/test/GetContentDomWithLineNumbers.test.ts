import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getGutterDom, getRowsDom } from '../src/parts/GetContentDomWithLineNumbers/GetContentDomWithLineNumbers.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('getGutterDom renders the gutter and line numbers', (): void => {
  const result = getGutterDom([
    {
      lineNumber: 3,
      tokens: [],
      type: VisibleLineType.Normal,
    },
    {
      lineNumber: 4,
      tokens: [],
      type: VisibleLineType.Normal,
    },
  ])

  expect(result).toEqual([
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
    text('3'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('4'),
  ])
})

test('getRowsDom renders the rows container and spacers', (): void => {
  const result = getRowsDom(4, [
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('row-1'),
  ])

  expect(result).toEqual([
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
    text('row-1'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})
