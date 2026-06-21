import type { InlineDiffRow } from '../InlineDiffRow/InlineDiffRow.ts'
import { InlineDiffRowType } from '../InlineDiffRowType/InlineDiffRowType.ts'

export const getDeletionRow = (lineNumberLeft: number, text: string): InlineDiffRow => ({
  lineNumberLeft,
  lineNumberRight: null,
  text,
  type: InlineDiffRowType.Deletion,
})
