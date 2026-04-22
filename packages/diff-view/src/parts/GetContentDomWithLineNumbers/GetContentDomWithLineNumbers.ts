import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getGutterDom } from './GetGutterDom/GetGutterDom.ts'
import { getRowsDom } from './GetRowsDom/GetRowsDom.ts'

export const getContentDomWithLineNumbers = (
  contentClassName: string,
  visibleLines: readonly VisibleLine[],
  rowsChildCount: number,
  rows: readonly VirtualDomNode[],
  itemHeight = 20,
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
    ...getGutterDom(visibleLines, itemHeight),
    ...getRowsDom(rowsChildCount, rows),
  ]
}
