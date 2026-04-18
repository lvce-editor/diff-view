import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getLineNumbersDom } from '../src/parts/GetLineNumbersDom/GetLineNumbersDom.ts'

test('getLineNumbersDom renders a range of line numbers from the given start line', (): void => {
  const result = getLineNumbersDom(3, 2)

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