import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getSourceControlVirtualDom = (): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 1,
      className: 'Viewlet Diff',
      type: VirtualDomElements.Div,
    },
    text('hello world'),
  ]
  return dom
}
