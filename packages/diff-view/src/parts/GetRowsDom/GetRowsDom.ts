import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getRowDom = (line: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text(line),
  ]
}

export const getRowsDom = (lines: readonly string[]): readonly VirtualDomNode[] => {
  return lines.flatMap(getRowDom)
}
