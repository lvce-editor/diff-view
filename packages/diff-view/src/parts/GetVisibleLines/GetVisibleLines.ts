import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { getVisibleInlineDiffRows } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'
import type { VisibleInlineDiffRow } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'
import { VisibleLineType as VisibleLineTypeValue } from '../VisibleLine/VisibleLine.ts'
import { getLine } from './GetLine/GetLine.ts'
import { getTokens } from './GetTokens/GetTokens.ts'
import { getVisibleLineType } from './GetVisibleLineType/GetVisibleLineType.ts'

type DiffSide = 'left' | 'right'

const getNormalVisibleLines = (
  content: string,
  totalLineCount: number,
  minLineY: number,
  maxLineY: number,
  tokenizedLines: readonly TokenizedLine[],
): readonly VisibleLine[] => {
  return getVisibleRows(content, totalLineCount, minLineY, maxLineY).map((line, index) => ({
    lineNumber: minLineY + index + 1,
    tokens: getTokens(tokenizedLines, minLineY + index, line),
    type: VisibleLineTypeValue.Normal,
  }))
}

const getInlineChange = (visibleRow: VisibleInlineDiffRow, side: DiffSide): InlineDiffChange | undefined => {
  if (side === 'left') {
    return visibleRow.leftChange
  }
  return visibleRow.rightChange
}

const getLineIndex = (inlineChange: InlineDiffChange | undefined, side: DiffSide): number => {
  if (!inlineChange) {
    return -1
  }
  if (side === 'left') {
    return inlineChange.leftIndex
  }
  return inlineChange.rightIndex
}

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
    return getNormalVisibleLines(content, totalLineCount, minLineY, maxLineY, tokenizedLines)
  }

  const lines = content ? content.split('\n') : ['']
  return getVisibleInlineDiffRows(inlineChanges)
    .slice(minLineY, maxLineY)
    .map((visibleRow) => {
      const inlineChange = getInlineChange(visibleRow, side)
      const type = inlineChange ? getVisibleLineType(inlineChange, side) : VisibleLineTypeValue.Normal
      const lineIndex = getLineIndex(inlineChange, side)
      const tokens = inlineChange && lineIndex >= 0 ? getTokens(tokenizedLines, lineIndex, getLine(lines, lineIndex)) : []
      return {
        lineNumber: lineIndex >= 0 ? lineIndex + 1 : -1,
        tokens,
        type,
      }
    })
}
