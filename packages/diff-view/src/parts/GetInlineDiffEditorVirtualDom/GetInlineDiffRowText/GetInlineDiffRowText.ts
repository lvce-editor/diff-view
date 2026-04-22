import { InlineDiffRowType, type InlineDiffRow } from '../../GetInlineDiffRows/GetInlineDiffRows.ts'

export const getInlineDiffRowText = (row: InlineDiffRow): string => {
  switch (row.type) {
    case InlineDiffRowType.Deletion:
      return `- ${row.text}`
    case InlineDiffRowType.Insertion:
      return `+ ${row.text}`
    default:
      return `  ${row.text}`
  }
}
