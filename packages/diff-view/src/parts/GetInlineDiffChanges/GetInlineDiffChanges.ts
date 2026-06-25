import { DiffWorker } from '@lvce-editor/rpc-registry'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'

export const getInlineDiffChanges = (linesLeft: readonly string[], linesRight: readonly string[]): Promise<readonly InlineDiffChange[]> => {
  return DiffWorker.invoke('Diff.diffInline', linesLeft, linesRight)
}
