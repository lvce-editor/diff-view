import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getContentLeftDom } from '../src/parts/GetContentLeftDom/GetContentLeftDom.ts'

test('getContentLeftDom renders left content inside wrappers', (): void => {
  const result = getContentLeftDom('before-content')

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'DiffEditorContent',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'DiffEditorContentLeft',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'before-content',
      type: 12,
    },
  ])
})
