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