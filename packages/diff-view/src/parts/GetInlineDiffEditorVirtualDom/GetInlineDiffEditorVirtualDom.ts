import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getDiffEditorButtonsDom } from '../GetDiffEditorButtonsDom/GetDiffEditorButtonsDom.ts'
import { getDiffSearchHeaderDom } from '../GetDiffSearchHeaderDom/GetDiffSearchHeaderDom.ts'
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
  searchVisible: boolean,
  searchQuery: string,
  showWhitespace: boolean,
  tokenizedLinesLeft: readonly TokenizedLine[],
  tokenizedLinesRight: readonly TokenizedLine[],
): readonly VirtualDomNode[] => {
  const rows = getInlineDiffRows(contentLeft, contentRight)
  const visibleRows = rows.slice(minLineY, maxLineY)
  const contentChildCount = lineNumbers ? 2 : 1
  const scrollBarActive = visibleRows.length < rows.length
  const rowsChildCount = visibleRows.length
  const buttonsDom = getDiffEditorButtonsDom('inline', showWhitespace)
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
  const searchHeaderDom = searchVisible ? getDiffSearchHeaderDom(contentLeft, contentRight, searchQuery) : []
  return [
    {
      childCount: (scrollBarActive ? 3 : 2) + (searchVisible ? 1 : 0),
      className: mergeClassNames(ClassNames.Viewlet, ClassNames.DiffEditor, ClassNames.InlineDiffEditor),
      type: VirtualDomElements.Div,
    },
    ...searchHeaderDom,
    {
      childCount: contentChildCount,
      className: mergeClassNames(ClassNames.DiffEditorContent, ClassNames.InlineDiffEditorContent),
      type: VirtualDomElements.Div,
    },
    ...lineNumberDom,
    {
      childCount: rowsChildCount,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    ...visibleRows.flatMap((row) =>
      getInlineDiffRowDom(row, row.lineNumberRight === null ? tokenizedLinesLeft[row.lineNumberLeft! - 1] : tokenizedLinesRight[row.lineNumberRight - 1]),
    ),
    ...buttonsDom,
    ...scrollBarDom,
  ]
}
