import type { InlineDiffRow } from '../InlineDiffRow/InlineDiffRow.ts'
import { InlineDiffRowType } from '../InlineDiffRowType/InlineDiffRowType.ts'

export const getInsertionRow = (lineNumberRight: number, text: string): InlineDiffRow => ({
  lineNumberLeft: null,
  lineNumberRight,
  text,
  type: InlineDiffRowType.Insertion,
})
