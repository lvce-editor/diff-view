import type { InlineDiffRow } from './InlineDiffRow/InlineDiffRow.ts'
import { getContextRow } from './GetContextRow/GetContextRow.ts'
import { getDeletionRow } from './GetDeletionRow/GetDeletionRow.ts'
import { getInsertionRow } from './GetInsertionRow/GetInsertionRow.ts'
import { getLines } from './GetLines/GetLines.ts'
import { getLookAheadRows } from './GetLookAheadRows/GetLookAheadRows.ts'
import { InlineDiffRowType as InlineDiffRowTypeValue } from './InlineDiffRowType/InlineDiffRowType.ts'

export { type InlineDiffRow } from './InlineDiffRow/InlineDiffRow.ts'
export const InlineDiffRowType = InlineDiffRowTypeValue
export type InlineDiffRowType = (typeof InlineDiffRowType)[keyof typeof InlineDiffRowType]

export const getInlineDiffRows = (contentLeft: string, contentRight: string): readonly InlineDiffRow[] => {
  const leftLines = getLines(contentLeft)
  const rightLines = getLines(contentRight)
  const rows: InlineDiffRow[] = []
  let leftIndex = 0
  let rightIndex = 0
  let leftLineNumber = 1
  let rightLineNumber = 1

  while (leftIndex < leftLines.length || rightIndex < rightLines.length) {
    const leftLine = leftLines[leftIndex]
    const rightLine = rightLines[rightIndex]

    if (leftIndex < leftLines.length && rightIndex < rightLines.length && leftLine === rightLine) {
      rows.push(getContextRow(leftLineNumber, rightLineNumber, leftLine))
      leftIndex++
      rightIndex++
      leftLineNumber++
      rightLineNumber++
      continue
    }

    if (leftIndex < leftLines.length && rightIndex < rightLines.length) {
      const lookAheadRows = getLookAheadRows(leftLines, rightLines, leftIndex, rightIndex, leftLineNumber, rightLineNumber)
      if (lookAheadRows) {
        rows.push(...lookAheadRows.rows)
        leftIndex += lookAheadRows.leftCount
        leftLineNumber += lookAheadRows.leftCount
        rightIndex += lookAheadRows.rightCount
        rightLineNumber += lookAheadRows.rightCount
        continue
      }
    }

    if (leftIndex < leftLines.length) {
      rows.push(getDeletionRow(leftLineNumber, leftLines[leftIndex]))
      leftIndex++
      leftLineNumber++
    }

    if (rightIndex < rightLines.length) {
      rows.push(getInsertionRow(rightLineNumber, rightLines[rightIndex]))
      rightIndex++
      rightLineNumber++
    }
  }

  return rows
}
