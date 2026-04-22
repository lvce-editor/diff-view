import type { InlineDiffRow } from '../../GetInlineDiffRows/GetInlineDiffRows.ts'

export const getInlineDiffLineNumberText = (row: InlineDiffRow): string => {
  const left = row.lineNumberLeft === null ? '-' : String(row.lineNumberLeft)
  const right = row.lineNumberRight === null ? '-' : String(row.lineNumberRight)
  return `${left} ${right}`
}
