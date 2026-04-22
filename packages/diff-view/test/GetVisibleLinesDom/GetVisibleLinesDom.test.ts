import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../../src/parts/ClassNames/ClassNames.ts'
import { getVisibleLinesDom } from '../../src/parts/GetVisibleLinesDom/GetVisibleLinesDom.ts'
import { VisibleLineType } from '../../src/parts/VisibleLine/VisibleLine.ts'

test('getVisibleLinesDom renders each visible line into its own row', (): void => {
  const result = getVisibleLinesDom(
    [
      { lineNumber: 1, tokens: [], type: VisibleLineType.Normal },
      { lineNumber: 2, tokens: [{ text: 'removed-line', type: '' }], type: VisibleLineType.Removed },
      { lineNumber: 3, tokens: [{ text: 'added-line', type: '' }], type: VisibleLineType.Added },
    ],
    'left',
  )

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text(''),
    {
      childCount: 1,
      className: ClassNames.EditorRowDeletion,
      type: VirtualDomElements.Div,
    },
    text('removed-line'),
    {
      childCount: 1,
      className: ClassNames.EditorRowInsertion,
      type: VirtualDomElements.Div,
    },
    text('added-line'),
  ])
})
