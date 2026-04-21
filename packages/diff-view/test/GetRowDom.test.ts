import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getRowDom } from '../src/parts/GetRowDom/GetRowDom.ts'

test('getRowDom renders a single line inside an EditorRow', (): void => {
  const result = getRowDom('first-line')

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
  ])
})

test('getRowDom can render a styled diff row', (): void => {
  const result = getRowDom('deleted-line', ClassNames.EditorRowDeletion)

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
  ])
})

test('getRowDom can render syntax token spans', (): void => {
  const result = getRowDom('const answer = 1', ClassNames.EditorRow, [
    { className: 'Token Keyword', text: 'const' },
    { className: 'Token Text', text: ' answer = 1' },
  ])

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
