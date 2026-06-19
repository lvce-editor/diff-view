import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { getInlineDiffLineNumberText } from '../GetInlineDiffLineNumberText/GetInlineDiffLineNumberText.ts'
import { getLineNumberClassName } from '../GetLineNumberClassName/GetLineNumberClassName.ts'

export const getInlineDiffLineNumberDom = (row: InlineDiffRow): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: getLineNumberClassName(row.type),
      type: VirtualDomElements.Div,
    },
    text(getInlineDiffLineNumberText(row)),
  ]
}
