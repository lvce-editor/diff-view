import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { SyntaxToken } from '../SyntaxToken/SyntaxToken.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'
import * as InlineDiffChangeType from '../InlineDiffChangeType/InlineDiffChangeType.ts'

export interface InlineDiffRow {
  readonly className: string
  readonly parts: readonly SyntaxToken[]
  readonly text: string
}

type DiffSide = 'left' | 'right'

const getLine = (lines: readonly string[], index: number): string => {
  if (index < 0 || index >= lines.length) {
    return ''
  }
  return lines[index]
}

const getRowClassName = (type: number, side: DiffSide): string => {
  if (side === 'left' && type === InlineDiffChangeType.Deletion) {
    return ClassNames.EditorRowDeletion
  }
  if (side === 'right' && type === InlineDiffChangeType.Insertion) {
    return ClassNames.EditorRowInsertion
  }
  return ClassNames.EditorRow
}

const getRowText = (lines: readonly string[], inlineChange: InlineDiffChange, side: DiffSide): string => {
  switch (inlineChange.type) {
    case InlineDiffChangeType.Deletion:
      return side === 'left' ? getLine(lines, inlineChange.leftIndex) : ''
    case InlineDiffChangeType.Insertion:
      return side === 'right' ? getLine(lines, inlineChange.rightIndex) : ''
    case InlineDiffChangeType.None:
      return getLine(lines, side === 'left' ? inlineChange.leftIndex : inlineChange.rightIndex)
    default:
      return ''
  }
}

const getRowParts = (tokenizedLines: readonly TokenizedLine[], index: number, text: string): readonly SyntaxToken[] => {
  const tokenizedLine = tokenizedLines[index]
  if (!tokenizedLine || tokenizedLine.length === 0) {
    return text ? [{ className: '', text }] : []
  }
  const parts: SyntaxToken[] = []
  for (let i = 0; i < tokenizedLine.length; i += 2) {
    parts.push({
      className: tokenizedLine[i + 1] || '',
      text: tokenizedLine[i] || '',
    })
  }
  return parts
}

const getInlineDiffRowParts = (tokenizedLines: readonly TokenizedLine[], inlineChange: InlineDiffChange, side: DiffSide, text: string): readonly SyntaxToken[] => {
  switch (inlineChange.type) {
    case InlineDiffChangeType.Deletion:
      return side === 'left' ? getRowParts(tokenizedLines, inlineChange.leftIndex, text) : []
    case InlineDiffChangeType.Insertion:
      return side === 'right' ? getRowParts(tokenizedLines, inlineChange.rightIndex, text) : []
    case InlineDiffChangeType.None:
      return getRowParts(tokenizedLines, side === 'left' ? inlineChange.leftIndex : inlineChange.rightIndex, text)
    default:
      return []
  }
}

export const getVisibleInlineDiffRows = (
  content: string,
  totalLineCount: number,
  inlineChanges: readonly InlineDiffChange[],
  minLineY: number,
  maxLineY: number,
  side: DiffSide,
  tokenizedLines: readonly TokenizedLine[] = [],
): readonly InlineDiffRow[] => {
  if (inlineChanges.length === 0) {
    return getVisibleRows(content, totalLineCount, minLineY, maxLineY).map((line, index) => ({
      className: ClassNames.EditorRow,
      parts: getRowParts(tokenizedLines, minLineY + index, line),
      text: line,
    }))
  }
  const lines = content ? content.split('\n') : ['']
  return inlineChanges.slice(minLineY, maxLineY).map((inlineChange) => {
    const text = getRowText(lines, inlineChange, side)
    return {
      className: getRowClassName(inlineChange.type, side),
      parts: getInlineDiffRowParts(tokenizedLines, inlineChange, side, text),
      text,
    }
  })
}
