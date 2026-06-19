import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getLineNumberClassName } from '../GetLineNumberClassName/GetLineNumberClassName.ts'
import { VisibleLineType, type VisibleLine } from '../VisibleLine/VisibleLine.ts'

export const getLineNumberDom = (lineNumber: number, type: VisibleLine['type'] = VisibleLineType.Normal): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: getLineNumberClassName(type),
      type: VirtualDomElements.Div,
    },
    text(lineNumber === -1 ? '' : String(lineNumber)),
  ]
}
