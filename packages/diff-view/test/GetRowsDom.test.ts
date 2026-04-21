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

test('getRowsDom can render syntax token spans for individual rows', (): void => {
  const result = getRowsDom(
    ['const answer = 1'],
    [ClassNames.EditorRow],
    [
      [
        { className: 'Token Keyword', text: 'const' },
        { className: 'Token Text', text: ' answer = 1' },
      ],
    ],
  )

  expect(result).toEqual([
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
    {
      childCount: 0,
      text: 'const',
      type: 12,
    },
    {
      childCount: 1,
      className: 'Token Text',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: ' answer = 1',
      type: 12,
    },
  ])
})
