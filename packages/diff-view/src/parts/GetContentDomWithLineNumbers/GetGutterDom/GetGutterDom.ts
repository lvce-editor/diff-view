import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine } from '../../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { getLineNumberDom } from '../../GetLineNumberDom/GetLineNumberDom.ts'

const getEmptyLineNumberDom = (emptyLineCount: number, itemHeight: number): VirtualDomNode => {
  return {
    childCount: 0,
    className: ClassNames.DiffEditorLineNumberEmpty,
    style: `height: ${emptyLineCount * itemHeight}px;`,
    type: VirtualDomElements.Div,
  }
}

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
    children.push(...getLineNumberDom(line.lineNumber))
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
