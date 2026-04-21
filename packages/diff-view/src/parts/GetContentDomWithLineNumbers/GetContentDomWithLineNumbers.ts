import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLineNumbersDom } from '../GetLineNumbersDom/GetLineNumbersDom.ts'

export const getContentDomWithLineNumbers = (
  contentClassName: string,
  startLineNumber: number,
  lineCount: number,
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
    ...getLineNumbersDom(startLineNumber, lineCount),
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
