import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getLineNumberDom } from '../src/parts/GetLineNumberDom/GetLineNumberDom.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('getLineNumberDom renders a single line number', (): void => {
  const result = getLineNumberDom(7)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('7'),
  ])
})

test('getLineNumberDom renders an empty gutter cell for missing line numbers', (): void => {
  const result = getLineNumberDom(-1)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text(''),
  ])
})

test('getLineNumberDom renders deletion and insertion line number states', (): void => {
  expect(getLineNumberDom(8, VisibleLineType.Removed)).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.DiffEditorLineNumber} ${ClassNames.DiffEditorLineNumberDeletion}`,
      type: VirtualDomElements.Div,
    },
    text('8'),
  ])

  expect(getLineNumberDom(9, VisibleLineType.Added)).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.DiffEditorLineNumber} ${ClassNames.DiffEditorLineNumberInsertion}`,
      type: VirtualDomElements.Div,
    },
    text('9'),
  ])
})
