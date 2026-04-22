import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import { getInlineDiffChanges } from '../GetInlineDiffChanges/GetInlineDiffChanges.ts'
import { getVisibleInlineDiffRows } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'

export const getInlineDiffState = async (
  contentLeft: string,
  contentRight: string,
): Promise<{ readonly inlineChanges: readonly InlineDiffChange[]; readonly totalLineCount: number }> => {
  const linesLeft = contentLeft ? contentLeft.split('\n') : ['']
  const linesRight = contentRight ? contentRight.split('\n') : ['']
  const inlineChanges = await getInlineDiffChanges(linesLeft, linesRight)
  return {
    inlineChanges,
    totalLineCount: Math.max(getVisibleInlineDiffRows(inlineChanges).length, 1),
  }
}
