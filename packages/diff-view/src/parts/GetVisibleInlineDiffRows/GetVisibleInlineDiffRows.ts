import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'
import * as InlineDiffChangeType from '../InlineDiffChangeType/InlineDiffChangeType.ts'

export interface InlineDiffRow {
  readonly className: string
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

export const getVisibleInlineDiffRows = (
  content: string,
  totalLineCount: number,
  inlineChanges: readonly InlineDiffChange[],
  minLineY: number,
  maxLineY: number,
  side: DiffSide,
): readonly InlineDiffRow[] => {
  if (inlineChanges.length === 0) {
    return getVisibleRows(content, totalLineCount, minLineY, maxLineY).map((line) => ({
      className: ClassNames.EditorRow,
      text: line,
    }))
  }
  const lines = content ? content.split('\n') : ['']
  return inlineChanges.slice(minLineY, maxLineY).map((inlineChange) => ({
    className: getRowClassName(inlineChange.type, side),
    text: getRowText(lines, inlineChange, side),
  }))
}
