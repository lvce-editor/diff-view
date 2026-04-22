import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLineToken } from '../../VisibleLine/VisibleLine.ts'

export const getTokenDom = (token: VisibleLineToken): readonly VirtualDomNode[] => {
  if (!token.type) {
    return [text(token.text)]
  }
  return [
    {
      childCount: 1,
      className: token.type,
      type: VirtualDomElements.Span,
    },
    text(token.text),
  ]
}
