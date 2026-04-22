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
  ], 20)

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

test('getGutterDom collapses consecutive empty line numbers into a single placeholder block', (): void => {
  const result = getGutterDom(
    [
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
        lineNumber: -1,
        tokens: [],
        type: VisibleLineType.Normal,
      },
      {
        lineNumber: 5,
        tokens: [],
        type: VisibleLineType.Normal,
      },
    ],
    20,
  )

  expect(result).toEqual([
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
      style: 'height: 60px;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('5'),
  ])
})
