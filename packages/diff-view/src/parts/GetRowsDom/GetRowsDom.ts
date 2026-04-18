import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { getRowDom } from '../GetRowDom/GetRowDom.ts'

export const getRowsDom = (lines: readonly string[]): readonly VirtualDomNode[] => {
  return lines.flatMap(getRowDom)
}
