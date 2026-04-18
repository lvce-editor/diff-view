import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getContentRightDom = (contentRight: string): readonly VirtualDomNode[] => {
  return [
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
    text(contentRight),
  ]
}