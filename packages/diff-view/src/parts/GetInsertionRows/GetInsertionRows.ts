import type { InlineDiffRow } from '../InlineDiffRow/InlineDiffRow.ts'
import { getInsertionRow } from '../GetInsertionRow/GetInsertionRow.ts'

export const getInsertionRows = (lines: readonly string[], startIndex: number, endIndex: number, startLineNumber: number): readonly InlineDiffRow[] => {
  const rows: InlineDiffRow[] = []
  for (let index = startIndex; index < endIndex; index++) {
    rows.push(getInsertionRow(startLineNumber + index - startIndex, lines[index]))
  }
  return rows
}
