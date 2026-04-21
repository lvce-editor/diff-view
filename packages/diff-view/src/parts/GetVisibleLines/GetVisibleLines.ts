import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'
import * as InlineDiffChangeType from '../InlineDiffChangeType/InlineDiffChangeType.ts'
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
  return inlineChanges.slice(minLineY, maxLineY).map((inlineChange, index) => {
    const lineNumber = minLineY + index + 1
    const type = getVisibleLineType(inlineChange, side)
    const tokens =
      inlineChange.type === InlineDiffChangeType.Deletion
        ? side === 'left'
          ? getTokens(tokenizedLines, inlineChange.leftIndex, getLine(lines, inlineChange.leftIndex))
          : []
        : inlineChange.type === InlineDiffChangeType.Insertion
          ? side === 'right'
            ? getTokens(tokenizedLines, inlineChange.rightIndex, getLine(lines, inlineChange.rightIndex))
            : []
          : getTokens(
              tokenizedLines,
              side === 'left' ? inlineChange.leftIndex : inlineChange.rightIndex,
              getLine(lines, side === 'left' ? inlineChange.leftIndex : inlineChange.rightIndex),
            )
    return {
      lineNumber,
      tokens,
      type,
    }
  })
}
