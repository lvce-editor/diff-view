import type { InlineDiffRowType } from '../InlineDiffRowType/InlineDiffRowType.ts'

export interface InlineDiffRow {
  readonly lineNumberLeft: number | null
  readonly lineNumberRight: number | null
  readonly text: string
  readonly type: InlineDiffRowType
}
