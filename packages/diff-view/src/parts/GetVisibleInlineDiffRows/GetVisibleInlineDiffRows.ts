import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import * as InlineDiffChangeType from '../InlineDiffChangeType/InlineDiffChangeType.ts'

export interface VisibleInlineDiffRow {
  readonly leftChange?: InlineDiffChange
  readonly rightChange?: InlineDiffChange
}

export const getVisibleInlineDiffRows = (inlineChanges: readonly InlineDiffChange[]): readonly VisibleInlineDiffRow[] => {
  const visibleRows: VisibleInlineDiffRow[] = []

  for (let index = 0; index < inlineChanges.length; index++) {
    const inlineChange = inlineChanges[index]
    const nextInlineChange = inlineChanges[index + 1]

    if (inlineChange.type === InlineDiffChangeType.Deletion && nextInlineChange?.type === InlineDiffChangeType.Insertion) {
      visibleRows.push({
        leftChange: inlineChange,
        rightChange: nextInlineChange,
      })
      index++
      continue
    }

    if (inlineChange.type === InlineDiffChangeType.Deletion) {
      visibleRows.push({
        leftChange: inlineChange,
      })
      continue
    }

    if (inlineChange.type === InlineDiffChangeType.Insertion) {
      visibleRows.push({
        rightChange: inlineChange,
      })
      continue
    }

    visibleRows.push({
      leftChange: inlineChange,
      rightChange: inlineChange,
    })
  }

  return visibleRows
}
