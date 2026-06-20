import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine } from '../../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { getLineNumberDom } from '../../GetLineNumberDom/GetLineNumberDom.ts'

export const getGutterDom = (visibleLines: readonly VisibleLine[], itemHeight: number): readonly VirtualDomNode[] => {
  const children: VirtualDomNode[] = []
  let childCount = 0

  for (const line of visibleLines) {
    children.push(...getLineNumberDom(line.lineNumber, line.type))
    childCount++
  }

  return [
    {
      childCount,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...children,
  ]
}
