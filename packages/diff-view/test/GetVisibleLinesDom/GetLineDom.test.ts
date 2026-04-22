import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../../src/parts/ClassNames/ClassNames.ts'
import { getLineDom } from '../../src/parts/GetVisibleLinesDom/GetLineDom/GetLineDom.ts'
import { VisibleLineType } from '../../src/parts/VisibleLine/VisibleLine.ts'

test('getLineDom renders an empty visible line as a blank row', (): void => {
  const result = getLineDom({ lineNumber: 1, tokens: [], type: VisibleLineType.Normal })

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text(''),
  ])
})

test('getLineDom renders token spans inside a row', (): void => {
  const result = getLineDom({
    lineNumber: 1,
    tokens: [
      { text: 'const', type: 'Token Keyword' },
      { text: ' answer = 1', type: 'Token Text' },
    ],
    type: VisibleLineType.Added,
  })

  expect(result).toEqual([
    {
      childCount: 2,
      className: ClassNames.EditorRowInsertion,
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
