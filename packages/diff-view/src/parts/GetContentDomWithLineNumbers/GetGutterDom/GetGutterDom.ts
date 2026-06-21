import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine } from '../../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { getEmptyLineNumberDom } from '../../GetEmptyLineNumberDom/GetEmptyLineNumberDom.ts'
import { getLineNumberDom } from '../../GetLineNumberDom/GetLineNumberDom.ts'

export const getGutterDom = (visibleLines: readonly VisibleLine[], itemHeight: number): readonly VirtualDomNode[] => {
  const children: VirtualDomNode[] = []
  let childCount = 0
  let emptyLineCount = 0

  for (const line of visibleLines) {
    if (line.lineNumber === -1) {
      emptyLineCount++
      continue
    }
    if (emptyLineCount > 0) {
      children.push(getEmptyLineNumberDom(emptyLineCount, itemHeight))
      childCount++
      emptyLineCount = 0
    }
    children.push(...getLineNumberDom(line.lineNumber, line.type))
    childCount++
  }

  if (emptyLineCount > 0) {
    children.push(getEmptyLineNumberDom(emptyLineCount, itemHeight))
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
