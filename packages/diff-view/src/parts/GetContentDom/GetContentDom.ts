import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import { getContentDomWithLineNumbers } from '../GetContentDomWithLineNumbers/GetContentDomWithLineNumbers.ts'
import { getContentDomWithoutLineNumbers } from '../GetContentDomWithoutLineNumbers/GetContentDomWithoutLineNumbers.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'
import { getRowsDom } from '../GetRowsDom/GetRowsDom.ts'
import { getVisibleInlineDiffRows } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'

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
  tokenizedLines: readonly TokenizedLine[] = [],
): readonly VirtualDomNode[] => {
  if (errorMessage) {
    return getErrorDom(contentClassName, errorMessage, errorStack)
  }
  const lines = getVisibleInlineDiffRows(content, totalLineCount, inlineChanges, minLineY, maxLineY, side, tokenizedLines)
  const rows = getRowsDom(
    lines.map((line) => line.text),
    lines.map((line) => line.className),
    lines.map((line) => line.parts),
  )
  const startLineNumber = minLineY + 1
  const rowsChildCount = lines.length + 2

  if (lineNumbers) {
    return getContentDomWithLineNumbers(contentClassName, startLineNumber, lines.length, rowsChildCount, rows)
  }

  return getContentDomWithoutLineNumbers(contentClassName, rowsChildCount, rows)
}
