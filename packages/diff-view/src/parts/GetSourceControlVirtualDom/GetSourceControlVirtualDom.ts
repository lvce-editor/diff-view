import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export const getSourceControlVirtualDom = (items: readonly VisibleItem[], splitButtonEnabled: boolean, inputPlaceholder: string): readonly VirtualDomNode[] => {
  const dom = [
    {
      childCount: 1,
      type: 'Viewlet Diff',
      type: VirtualDomElements.Div,
    },
    text('hello world'),
  ]
  return dom
}
