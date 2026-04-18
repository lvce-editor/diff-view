import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'
import { getLineNumbersDom } from '../GetLineNumbersDom/GetLineNumbersDom.ts'
import { getRowsDom } from '../GetRowsDom/GetRowsDom.ts'
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'

<<<<<<< HEAD
const getLineNumberDom = (lineNumber: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text(String(lineNumber)),
  ]
}

const getLineNumbersDom = (startLineNumber: number, lineCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: lineCount,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...Array.from({ length: lineCount }, (_, index) => getLineNumberDom(startLineNumber + index)).flat(),
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
): readonly VirtualDomNode[] => {
=======
export const getContentDom = (contentClassName: string, content: string, errorMessage: string, errorStack: string, lineNumbers: boolean): readonly VirtualDomNode[] => {
>>>>>>> origin/main
  if (errorMessage) {
    return getErrorDom(contentClassName, errorMessage, errorStack)
  }
  const lines = getVisibleRows(content, totalLineCount, minLineY, maxLineY)
  const rows = getRowsDom(lines)
  const startLineNumber = minLineY + 1
  const rowsChildCount = lines.length + 2

  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: lineNumbers ? 2 : rowsChildCount,
      className: contentClassName,
      type: VirtualDomElements.Div,
    },
    ...(lineNumbers ? getLineNumbersDom(startLineNumber, lines.length) : []),
    ...(lineNumbers
      ? [
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
      : [
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
        ]),
  ]
}
