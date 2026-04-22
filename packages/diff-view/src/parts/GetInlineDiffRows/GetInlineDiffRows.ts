import { findLookAheadMatch } from './FindLookAheadMatch/FindLookAheadMatch.ts'
import { getLines } from './GetLines/GetLines.ts'

export const InlineDiffRowType = {
  Context: 'context',
  Deletion: 'deletion',
  Insertion: 'insertion',
} as const

export type InlineDiffRowType = (typeof InlineDiffRowType)[keyof typeof InlineDiffRowType]

export interface InlineDiffRow {
  readonly lineNumberLeft: number | null
  readonly lineNumberRight: number | null
  readonly text: string
  readonly type: InlineDiffRowType
}

export const getInlineDiffRows = (contentLeft: string, contentRight: string): readonly InlineDiffRow[] => {
  const leftLines = getLines(contentLeft)
  const rightLines = getLines(contentRight)
  const rows: InlineDiffRow[] = []
  let leftIndex = 0
  let rightIndex = 0
  let leftLineNumber = 1
  let rightLineNumber = 1

  while (leftIndex < leftLines.length || rightIndex < rightLines.length) {
    const leftLine = leftLines[leftIndex]
    const rightLine = rightLines[rightIndex]

    if (leftIndex < leftLines.length && rightIndex < rightLines.length && leftLine === rightLine) {
      rows.push({
        lineNumberLeft: leftLineNumber,
        lineNumberRight: rightLineNumber,
        text: leftLine,
        type: InlineDiffRowType.Context,
      })
      leftIndex++
      rightIndex++
      leftLineNumber++
      rightLineNumber++
      continue
    }

    if (leftIndex < leftLines.length && rightIndex < rightLines.length) {
      const leftMatch = findLookAheadMatch(leftLines, leftIndex + 1, rightLine)
      const rightMatch = findLookAheadMatch(rightLines, rightIndex + 1, leftLine)

      if (leftMatch !== -1 && (rightMatch === -1 || leftMatch - leftIndex <= rightMatch - rightIndex)) {
        while (leftIndex < leftMatch) {
          rows.push({
            lineNumberLeft: leftLineNumber,
            lineNumberRight: null,
            text: leftLines[leftIndex],
            type: InlineDiffRowType.Deletion,
          })
          leftIndex++
          leftLineNumber++
        }
        continue
      }

      if (rightMatch !== -1) {
        while (rightIndex < rightMatch) {
          rows.push({
            lineNumberLeft: null,
            lineNumberRight: rightLineNumber,
            text: rightLines[rightIndex],
            type: InlineDiffRowType.Insertion,
          })
          rightIndex++
          rightLineNumber++
        }
        continue
      }
    }

    if (leftIndex < leftLines.length) {
      rows.push({
        lineNumberLeft: leftLineNumber,
        lineNumberRight: null,
        text: leftLines[leftIndex],
        type: InlineDiffRowType.Deletion,
      })
      leftIndex++
      leftLineNumber++
    }

    if (rightIndex < rightLines.length) {
      rows.push({
        lineNumberLeft: null,
        lineNumberRight: rightLineNumber,
        text: rightLines[rightIndex],
        type: InlineDiffRowType.Insertion,
      })
      rightIndex++
      rightLineNumber++
    }
  }

  return rows
}
