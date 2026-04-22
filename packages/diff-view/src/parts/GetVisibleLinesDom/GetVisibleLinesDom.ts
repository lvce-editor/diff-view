import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine, VisibleLineToken } from '../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { VisibleLineType } from '../VisibleLine/VisibleLine.ts'

type DiffSide = 'left' | 'right'

const getTokenDom = (token: VisibleLineToken): readonly VirtualDomNode[] => {
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

const getRowClassName = (type: VisibleLine['type'], side: DiffSide): string => {
  if (type === VisibleLineType.Removed) {
    return ClassNames.EditorRowDeletion
  }
  if (type === VisibleLineType.Added) {
    return ClassNames.EditorRowInsertion
  }
  return ClassNames.EditorRow
}

const getLineDom = (line: VisibleLine, side: DiffSide): readonly VirtualDomNode[] => {
  const children = line.tokens.length === 0 ? [text('')] : line.tokens.flatMap(getTokenDom)
  return [
    {
      childCount: children.length,
      className: getRowClassName(line.type, side),
      type: VirtualDomElements.Div,
    },
    ...children,
  ]
}

export const getVisibleLinesDom = (visibleLines: readonly VisibleLine[], side: DiffSide): readonly VirtualDomNode[] => {
  return visibleLines.flatMap((line) => getLineDom(line, side))
}
