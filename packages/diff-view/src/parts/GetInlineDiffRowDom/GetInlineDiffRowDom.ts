import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { getInlineDiffRowClassName } from '../GetInlineDiffRowClassName/GetInlineDiffRowClassName.ts'
import { getInlineDiffRowText } from '../GetInlineDiffRowText/GetInlineDiffRowText.ts'

export const getInlineDiffRowDom = (row: InlineDiffRow): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: getInlineDiffRowClassName(row),
      type: VirtualDomElements.Div,
    },
    text(getInlineDiffRowText(row)),
  ]
}
