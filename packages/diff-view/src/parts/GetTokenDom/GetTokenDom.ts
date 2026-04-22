import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { SyntaxToken } from '../SyntaxToken/SyntaxToken.ts'

export const getTokenDom = (tokenPart: SyntaxToken): readonly VirtualDomNode[] => {
  if (!tokenPart.className) {
    return [text(tokenPart.text)]
  }
  return [
    {
      childCount: 1,
      className: tokenPart.className,
      type: VirtualDomElements.Span,
    },
    text(tokenPart.text),
  ]
}
