import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'

export const getDiffEditorVirtualDom = (contentLeft: string, contentRight: string): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      className: 'Viewlet DiffEditor',
      type: VirtualDomElements.Div,
    },
    ...getContentLeftDom(contentLeft),
    ...getContentRightDom(contentRight),
  ]
  return dom
}
