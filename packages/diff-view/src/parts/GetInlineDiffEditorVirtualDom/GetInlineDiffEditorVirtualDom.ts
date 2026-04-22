import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getInlineDiffRows } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { getScrollBarDom } from '../GetScrollBarDom/GetScrollBarDom.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'
import { getInlineDiffLineNumbersDom } from './GetInlineDiffLineNumbersDom/GetInlineDiffLineNumbersDom.ts'
import { getInlineDiffRowDom } from './GetInlineDiffRowDom/GetInlineDiffRowDom.ts'

export const getInlineDiffEditorVirtualDom = (
  contentLeft: string,
  contentRight: string,
  lineNumbers: boolean,
  minLineY: number,
  maxLineY: number,
): readonly VirtualDomNode[] => {
  const rows: readonly InlineDiffRow[] = getInlineDiffRows(contentLeft, contentRight)
  const visibleRows = rows.slice(minLineY, maxLineY)
  const contentChildCount = lineNumbers ? 2 : 1
  const scrollBarActive = visibleRows.length < rows.length
  const rowsChildCount = visibleRows.length + 2
  const lineNumberDom = lineNumbers ? getInlineDiffLineNumbersDom(visibleRows) : []
  const scrollBarDom = scrollBarActive ? getScrollBarDom() : []
  return [
    {
      childCount: scrollBarActive ? 2 : 1,
      className: mergeClassNames(ClassNames.Viewlet, ClassNames.DiffEditor, ClassNames.InlineDiffEditor),
      type: VirtualDomElements.Div,
    },
    {
      childCount: contentChildCount,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.InlineDiffEditorContent}`,
      type: VirtualDomElements.Div,
    },
    ...lineNumberDom,
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
    ...visibleRows.flatMap(getInlineDiffRowDom),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
    ...scrollBarDom,
  ]
}
