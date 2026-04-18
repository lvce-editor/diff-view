import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getContentLeftDom } from '../src/parts/GetContentLeftDom/GetContentLeftDom.ts'

test('getContentLeftDom renders each left line inside an EditorRow', (): void => {
  const result = getContentLeftDom('before-content\nsecond-line')

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'before-content',
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
