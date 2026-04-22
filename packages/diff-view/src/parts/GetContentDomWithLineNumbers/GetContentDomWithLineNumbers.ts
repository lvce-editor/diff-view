import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLineNumberDom } from '../GetLineNumberDom/GetLineNumberDom.ts'

export const getGutterDom = (visibleLines: readonly VisibleLine[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: visibleLines.length,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...visibleLines.flatMap((line) => getLineNumberDom(line.lineNumber)),
  ]
}

export const getRowsDom = (rowsChildCount: number, rows: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: rowsChildCount,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    ...rows,
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ]
}

export const getContentDomWithLineNumbers = (
  contentClassName: string,
  visibleLines: readonly VisibleLine[],
  rowsChildCount: number,
  rows: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: contentClassName,
      type: VirtualDomElements.Div,
    },
    ...getGutterDom(visibleLines),
    ...getRowsDom(rowsChildCount, rows),
  ]
}
