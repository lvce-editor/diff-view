import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'
import { getLineNumbersDom } from '../GetLineNumbersDom/GetLineNumbersDom.ts'
import { getRowsDom } from '../GetRowsDom/GetRowsDom.ts'
import { getVisibleInlineDiffRows } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'

const getContentDomWithLineNumbers = (
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

const getContentDomWithoutLineNumbers = (contentClassName: string, rowsChildCount: number, rows: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: rowsChildCount,
      className: contentClassName,
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

export const getContentDom = (
  contentClassName: string,
  content: string,
  errorMessage: string,
  errorStack: string,
  lineNumbers: boolean,
  totalLineCount: number,
  minLineY: number,
  maxLineY: number,
  inlineChanges: readonly InlineDiffChange[],
  side: 'left' | 'right',
): readonly VirtualDomNode[] => {
  if (errorMessage) {
    return getErrorDom(contentClassName, errorMessage, errorStack)
  }
  const lines = getVisibleInlineDiffRows(content, totalLineCount, inlineChanges, minLineY, maxLineY, side)
  const rows = getRowsDom(
    lines.map((line) => line.text),
    lines.map((line) => line.className),
  )
  const startLineNumber = minLineY + 1
  const rowsChildCount = lines.length + 2

  if (lineNumbers) {
    return getContentDomWithLineNumbers(contentClassName, startLineNumber, lines.length, rowsChildCount, rows)
  }

  return getContentDomWithoutLineNumbers(contentClassName, rowsChildCount, rows)
}
