import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine, VisibleLineToken, VisibleLineType } from '../VisibleLine/VisibleLine.ts'
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'
import * as InlineDiffChangeType from '../InlineDiffChangeType/InlineDiffChangeType.ts'
import { VisibleLineType as VisibleLineTypeValue } from '../VisibleLine/VisibleLine.ts'

type DiffSide = 'left' | 'right'

const getLine = (lines: readonly string[], index: number): string => {
  if (index < 0 || index >= lines.length) {
    return ''
  }
  return lines[index]
}

const getVisibleLineType = (inlineChange: InlineDiffChange, side: DiffSide): VisibleLineType => {
  switch (inlineChange.type) {
    case InlineDiffChangeType.Deletion:
      return side === 'left' ? VisibleLineTypeValue.Removed : VisibleLineTypeValue.Normal
    case InlineDiffChangeType.Insertion:
      return side === 'right' ? VisibleLineTypeValue.Added : VisibleLineTypeValue.Normal
    case InlineDiffChangeType.None:
      return VisibleLineTypeValue.Normal
    default:
      return VisibleLineTypeValue.Normal
  }
}

const getTokens = (tokenizedLines: readonly TokenizedLine[], index: number, text: string): readonly VisibleLineToken[] => {
  const tokenizedLine = tokenizedLines[index]
  if (!tokenizedLine || tokenizedLine.length === 0) {
    return text ? [{ text, type: '' }] : []
  }
  const tokens: VisibleLineToken[] = []
  for (let i = 0; i < tokenizedLine.length; i += 2) {
    tokens.push({
      text: tokenizedLine[i] || '',
      type: tokenizedLine[i + 1] || '',
    })
  }
  return tokens
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
