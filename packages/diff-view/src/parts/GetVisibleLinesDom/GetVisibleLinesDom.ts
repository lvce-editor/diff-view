import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { getLineDom } from './GetLineDom/GetLineDom.ts'

type DiffSide = 'left' | 'right'

export const getVisibleLinesDom = (visibleLines: readonly VisibleLine[], side: DiffSide): readonly VirtualDomNode[] => {
  return visibleLines.flatMap((line) => getLineDom(line, side))
}
