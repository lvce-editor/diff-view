import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getContentRightDom } from '../src/parts/GetContentRightDom/GetContentRightDom.ts'

test('getContentRightDom renders right content inside wrappers', (): void => {
  const result = getContentRightDom('after-content')

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'DiffEditorContent',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'DiffEditorContentRight',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'after-content',
      type: 12,
    },
  ])
})
