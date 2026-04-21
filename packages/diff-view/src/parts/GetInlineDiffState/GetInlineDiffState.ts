import type { DiffMode } from '../DiffViewState/DiffViewState.ts'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import { diff, getInlineDiffChanges } from '../GetInlineDiffChanges/GetInlineDiffChanges.ts'

interface SideBySideChange {
  readonly index: number
  readonly type: number
}

interface SideBySideDiffResult {
  readonly changesLeft: readonly SideBySideChange[]
  readonly changesRight: readonly SideBySideChange[]
}

export const getInlineDiffState = async (
  diffMode: DiffMode,
  contentLeft: string,
  contentRight: string,
): Promise<{ readonly inlineChanges: readonly InlineDiffChange[]; readonly totalLineCount: number }> => {
  const linesLeft = contentLeft ? contentLeft.split('\n') : ['']
  const linesRight = contentRight ? contentRight.split('\n') : ['']
  const inlineChanges =
    diffMode === 'side-by-side'
      ? getSideBySideInlineChanges(linesLeft, linesRight, (await diff(linesLeft, linesRight)) as SideBySideDiffResult)
      : await getInlineDiffChanges(linesLeft, linesRight)
  return {
    inlineChanges,
    totalLineCount: Math.max(inlineChanges.length, 1),
  }
}

const getChangeSet = (changes: readonly SideBySideChange[], type: number): ReadonlySet<number> => {
  return new Set(changes.filter((change) => change.type === type).map((change) => change.index))
}

const getSideBySideInlineChanges = (linesLeft: readonly string[], linesRight: readonly string[], result: SideBySideDiffResult): readonly InlineDiffChange[] => {
  const deletionIndexes = getChangeSet(result.changesLeft, 2)
  const insertionIndexes = getChangeSet(result.changesRight, 1)
  const inlineChanges: InlineDiffChange[] = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < linesLeft.length || rightIndex < linesRight.length) {
    const hasDeletion = deletionIndexes.has(leftIndex)
    const hasInsertion = insertionIndexes.has(rightIndex)

    if (hasDeletion && hasInsertion) {
      inlineChanges.push({ leftIndex, rightIndex, type: 2 })
      inlineChanges.push({ leftIndex, rightIndex, type: 1 })
      leftIndex++
      rightIndex++
      continue
    }

    if (hasDeletion) {
      inlineChanges.push({ leftIndex, rightIndex, type: 2 })
      leftIndex++
      continue
    }

    if (hasInsertion) {
      inlineChanges.push({ leftIndex, rightIndex, type: 1 })
      rightIndex++
      continue
    }

    if (leftIndex < linesLeft.length && rightIndex < linesRight.length) {
      inlineChanges.push({ leftIndex, rightIndex, type: 0 })
      leftIndex++
      rightIndex++
      continue
    }

    if (leftIndex < linesLeft.length) {
      inlineChanges.push({ leftIndex, rightIndex, type: 2 })
      leftIndex++
      continue
    }

    inlineChanges.push({ leftIndex, rightIndex, type: 1 })
    rightIndex++
  }

  return inlineChanges
}
