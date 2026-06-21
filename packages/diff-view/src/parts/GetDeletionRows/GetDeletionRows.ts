import type { InlineDiffRow } from '../InlineDiffRow/InlineDiffRow.ts'
import { getDeletionRow } from '../GetDeletionRow/GetDeletionRow.ts'

export const getDeletionRows = (lines: readonly string[], startIndex: number, endIndex: number, startLineNumber: number): readonly InlineDiffRow[] => {
  const rows: InlineDiffRow[] = []
  for (let index = startIndex; index < endIndex; index++) {
    rows.push(getDeletionRow(startLineNumber + index - startIndex, lines[index]))
  }
  return rows
}
