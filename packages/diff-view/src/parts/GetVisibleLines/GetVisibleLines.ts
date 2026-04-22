import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { getVisibleInlineDiffRows } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'
import { VisibleLineType as VisibleLineTypeValue } from '../VisibleLine/VisibleLine.ts'
import { getLine } from './GetLine/GetLine.ts'
import { getTokens } from './GetTokens/GetTokens.ts'
import { getVisibleLineType } from './GetVisibleLineType/GetVisibleLineType.ts'

type DiffSide = 'left' | 'right'

export const getVisibleLines = (
  content: string,
  totalLineCount: number,
  inlineChanges: readonly InlineDiffChange[],
  minLineY: number,
  maxLineY: number,
  side: DiffSide,
  tokenizedLines: readonly TokenizedLine[] = [],
): readonly VisibleLine[] => {
  if (inlineChanges.length === 0) {
    return getVisibleRows(content, totalLineCount, minLineY, maxLineY).map((line, index) => ({
      lineNumber: minLineY + index + 1,
      tokens: getTokens(tokenizedLines, minLineY + index, line),
      type: VisibleLineTypeValue.Normal,
    }))
  }

  const lines = content ? content.split('\n') : ['']
  return getVisibleInlineDiffRows(inlineChanges)
    .slice(minLineY, maxLineY)
    .map((visibleRow, index) => {
      const lineNumber = minLineY + index + 1
      const inlineChange = side === 'left' ? visibleRow.leftChange : visibleRow.rightChange
      const type = inlineChange ? getVisibleLineType(inlineChange, side) : VisibleLineTypeValue.Normal
      const lineIndex = inlineChange ? (side === 'left' ? inlineChange.leftIndex : inlineChange.rightIndex) : -1
      const tokens = inlineChange && lineIndex >= 0 ? getTokens(tokenizedLines, lineIndex, getLine(lines, lineIndex)) : []
      return {
        lineNumber,
        tokens,
        type,
      }
    })
}
