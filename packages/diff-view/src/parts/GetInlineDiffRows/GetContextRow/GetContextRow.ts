import type { InlineDiffRow } from '../InlineDiffRow/InlineDiffRow.ts'
import { InlineDiffRowType } from '../InlineDiffRowType/InlineDiffRowType.ts'

export const getContextRow = (lineNumberLeft: number, lineNumberRight: number, text: string): InlineDiffRow => ({
  lineNumberLeft,
  lineNumberRight,
  text,
  type: InlineDiffRowType.Context,
})
