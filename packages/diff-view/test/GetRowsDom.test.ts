import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getRowsDom } from '../src/parts/GetRowsDom/GetRowsDom.ts'

test('getRowsDom renders each line inside an EditorRow', (): void => {
  const result = getRowsDom(['first-line', 'second-line'])

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'first-line',
      type: 12,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'second-line',
      type: 12,
    },
  ])
})

test('getRowsDom applies per-row diff classes when provided', (): void => {
  const result = getRowsDom(['deleted-line', 'added-line'], [ClassNames.EditorRowDeletion, ClassNames.EditorRowInsertion])

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.EditorRowDeletion,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'deleted-line',
      type: 12,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRowInsertion,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'added-line',
      type: 12,
    },
  ])
})
