import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getContentLeftDom = (contentLeft: string): readonly VirtualDomNode[] => {
  return [
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
    text(contentLeft),
  ]
}
