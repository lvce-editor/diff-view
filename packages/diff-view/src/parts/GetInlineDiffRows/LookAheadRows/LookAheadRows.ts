import type { InlineDiffRow } from '../InlineDiffRow/InlineDiffRow.ts'

export interface LookAheadRows {
  readonly leftCount: number
  readonly rightCount: number
  readonly rows: readonly InlineDiffRow[]
}
