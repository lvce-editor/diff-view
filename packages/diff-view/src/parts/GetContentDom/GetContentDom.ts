import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { getContentDomWithLineNumbers } from '../GetContentDomWithLineNumbers/GetContentDomWithLineNumbers.ts'
import { getContentDomWithoutLineNumbers } from '../GetContentDomWithoutLineNumbers/GetContentDomWithoutLineNumbers.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'
import { getVisibleLines } from '../GetVisibleLines/GetVisibleLines.ts'
import { getVisibleLinesDom } from '../GetVisibleLinesDom/GetVisibleLinesDom.ts'

export const getContentDom = (
  contentClassName: string,
  content: string,
  errorMessage: string,
  errorCodeFrame: string,
  errorStack: string,
  allowedLinkSchemes: readonly string[],
  lineNumbers: boolean,
  totalLineCount: number,
  minLineY: number,
  maxLineY: number,
  inlineChanges: readonly InlineDiffChange[],
  side: 'left' | 'right',
  tokenizedLines: readonly TokenizedLine[] = [],
  visibleLines: readonly VisibleLine[] = [],
  itemHeight = 20,
): readonly VirtualDomNode[] => {
  if (errorMessage) {
    return getErrorDom(contentClassName, errorMessage, errorCodeFrame, errorStack, allowedLinkSchemes)
  }
  const lines = visibleLines.length > 0 ? visibleLines : getVisibleLines(content, totalLineCount, inlineChanges, minLineY, maxLineY, side, tokenizedLines)
  const rows = getVisibleLinesDom(lines)
  const rowsChildCount = lines.length

  if (lineNumbers) {
    return getContentDomWithLineNumbers(contentClassName, lines, rowsChildCount, rows, itemHeight)
  }

  return getContentDomWithoutLineNumbers(contentClassName, rowsChildCount, rows)
}
