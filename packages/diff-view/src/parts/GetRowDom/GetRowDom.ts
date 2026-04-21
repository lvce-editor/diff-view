import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { SyntaxToken } from '../SyntaxToken/SyntaxToken.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getTokenDom } from '../GetTokenDom/GetTokenDom.ts'

export const getRowDom = (line: string, className = ClassNames.EditorRow, parts: readonly SyntaxToken[] = []): readonly VirtualDomNode[] => {
  const children = parts.length === 0 ? [text(line)] : parts.flatMap(getTokenDom)
  return [
    {
      childCount: children.length,
      className,
      type: VirtualDomElements.Div,
    },
    ...children,
  ]
}
