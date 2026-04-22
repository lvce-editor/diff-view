import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getGutterDom } from '../src/parts/GetContentDomWithLineNumbers/GetGutterDom/GetGutterDom.ts'
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
