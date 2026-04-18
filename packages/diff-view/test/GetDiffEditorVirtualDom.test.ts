import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getDiffEditorVirtualDom } from '../src/parts/GetDiffEditorVirtualDom/GetDiffEditorVirtualDom.ts'

test('getDiffEditorVirtualDom renders left and right content inside wrappers', (): void => {
  const result = getDiffEditorVirtualDom('before-content', 'after-content')

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'Viewlet DiffEditor',
      type: VirtualDomElements.Div,
    },
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