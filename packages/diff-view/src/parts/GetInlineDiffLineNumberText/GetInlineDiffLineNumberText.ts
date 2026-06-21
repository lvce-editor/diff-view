import type { InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { InlineDiffRowType } from '../GetInlineDiffRows/GetInlineDiffRows.ts'

export const getInlineDiffLineNumberText = (row: InlineDiffRow): string => {
  if (row.type === InlineDiffRowType.GitButtons || row.type === InlineDiffRowType.IncomingChange) {
    return ''
  }
  const left = row.lineNumberLeft === null ? '' : String(row.lineNumberLeft)
  const right = row.lineNumberRight === null ? '' : String(row.lineNumberRight)
  return `${left} ${right}`
}
