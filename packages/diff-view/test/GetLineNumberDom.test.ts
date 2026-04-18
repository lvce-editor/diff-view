import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getLineNumberDom } from '../src/parts/GetLineNumberDom/GetLineNumberDom.ts'

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
