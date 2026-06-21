import type { LookAheadRows } from '../LookAheadRows/LookAheadRows.ts'
import { findLookAheadMatch } from '../FindLookAheadMatch/FindLookAheadMatch.ts'
import { getDeletionRows } from '../GetDeletionRows/GetDeletionRows.ts'
import { getInsertionRows } from '../GetInsertionRows/GetInsertionRows.ts'

export const getLookAheadRows = (
  leftLines: readonly string[],
  rightLines: readonly string[],
  leftIndex: number,
  rightIndex: number,
  leftLineNumber: number,
  rightLineNumber: number,
): LookAheadRows | undefined => {
  const leftLine = leftLines[leftIndex]
  const rightLine = rightLines[rightIndex]
  const leftMatch = findLookAheadMatch(leftLines, leftIndex + 1, rightLine)
  const rightMatch = findLookAheadMatch(rightLines, rightIndex + 1, leftLine)

  if (leftMatch !== -1 && (rightMatch === -1 || leftMatch - leftIndex <= rightMatch - rightIndex)) {
    return {
      leftCount: leftMatch - leftIndex,
      rightCount: 0,
      rows: getDeletionRows(leftLines, leftIndex, leftMatch, leftLineNumber),
    }
  }

  if (rightMatch !== -1) {
    return {
      leftCount: 0,
      rightCount: rightMatch - rightIndex,
      rows: getInsertionRows(rightLines, rightIndex, rightMatch, rightLineNumber),
    }
  }

  return undefined
}
