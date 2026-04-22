import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getInlineDiffLineNumberDom } from '../GetInlineDiffLineNumberDom/GetInlineDiffLineNumberDom.ts'
import { getInlineDiffRowDom } from '../GetInlineDiffRowDom/GetInlineDiffRowDom.ts'
import { getInlineDiffRows } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { getScrollBarDom } from '../GetScrollBarDom/GetScrollBarDom.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'

export const getInlineDiffEditorVirtualDom = (
  contentLeft: string,
  contentRight: string,
  lineNumbers: boolean,
  minLineY: number,
  maxLineY: number,
): readonly VirtualDomNode[] => {
  const rows = getInlineDiffRows(contentLeft, contentRight)
  const visibleRows = rows.slice(minLineY, maxLineY)
  const contentChildCount = lineNumbers ? 2 : 1
  const scrollBarActive = visibleRows.length < rows.length
  const rowsChildCount = visibleRows.length
  const lineNumberDom = lineNumbers
    ? [
        {
          childCount: visibleRows.length,
          className: ClassNames.DiffEditorGutter,
          type: VirtualDomElements.Div,
        },
        ...visibleRows.flatMap(getInlineDiffLineNumberDom),
      ]
    : []
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
    ...visibleRows.flatMap(getInlineDiffRowDom),
    ...scrollBarDom,
  ]
}
