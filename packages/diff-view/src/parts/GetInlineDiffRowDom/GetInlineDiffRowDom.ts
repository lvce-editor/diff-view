import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import { getInlineDiffRowClassName } from '../GetInlineDiffRowClassName/GetInlineDiffRowClassName.ts'
import { getTokens } from '../GetVisibleLines/GetTokens/GetTokens.ts'
import { getTokenDom } from '../GetVisibleLinesDom/GetTokenDom/GetTokenDom.ts'

const getPrefix = (row: InlineDiffRow): string => {
  if (row.lineNumberLeft === null) {
    if (row.lineNumberRight === null) {
      return ''
    }
    return '+ '
  }
  if (row.lineNumberRight === null) {
    return '- '
  }
  return '  '
}

export const getInlineDiffRowDom = (row: InlineDiffRow, tokenizedLine?: TokenizedLine): readonly VirtualDomNode[] => {
  const className = getInlineDiffRowClassName(row)
  const tokens = getTokens(tokenizedLine ? [tokenizedLine] : [], 0, row.text)
  const prefix = getPrefix(row)
  return [
    {
      childCount: tokens.length + 1,
      className,
      type: VirtualDomElements.Div,
    },
    text(prefix),
    ...tokens.flatMap(getTokenDom),
  ]
}
