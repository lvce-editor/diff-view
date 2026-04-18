import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getInlineDiffRows, InlineDiffRowType, type InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { getScrollBarDom } from '../GetScrollBarDom/GetScrollBarDom.ts'

const getInlineDiffLineNumberText = (row: InlineDiffRow): string => {
  const left = row.lineNumberLeft === null ? '-' : String(row.lineNumberLeft)
  const right = row.lineNumberRight === null ? '-' : String(row.lineNumberRight)
  return `${left} ${right}`
}

const getInlineDiffLineNumberDom = (row: InlineDiffRow): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text(getInlineDiffLineNumberText(row)),
  ]
}

const getRowClassName = (row: InlineDiffRow): string => {
  switch (row.type) {
    case InlineDiffRowType.Deletion:
      return ClassNames.EditorRowDeletion
    case InlineDiffRowType.Insertion:
      return ClassNames.EditorRowInsertion
    default:
      return ClassNames.EditorRow
  }
}

const getRowText = (row: InlineDiffRow): string => {
  switch (row.type) {
    case InlineDiffRowType.Deletion:
      return `- ${row.text}`
    case InlineDiffRowType.Insertion:
      return `+ ${row.text}`
    default:
      return `  ${row.text}`
  }
}

const getInlineDiffRowDom = (row: InlineDiffRow): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: getRowClassName(row),
      type: VirtualDomElements.Div,
    },
    text(getRowText(row)),
  ]
}

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
  const rowsChildCount = visibleRows.length + 2
  return [
    {
      childCount: 2,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.InlineDiffEditor}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: contentChildCount,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.InlineDiffEditorContent}`,
      type: VirtualDomElements.Div,
    },
    ...(lineNumbers
      ? [
          {
            childCount: visibleRows.length,
            className: ClassNames.DiffEditorGutter,
            type: VirtualDomElements.Div,
          },
          ...visibleRows.flatMap(getInlineDiffLineNumberDom),
        ]
      : []),
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
    ...getScrollBarDom(),
  ]
}
