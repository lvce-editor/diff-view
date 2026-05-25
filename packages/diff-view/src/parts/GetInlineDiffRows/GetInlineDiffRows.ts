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

const lookAheadLimit = 3

const getLines = (content: string): readonly string[] => {
  return content ? content.split('\n') : ['']
}

const findLookAheadMatch = (lines: readonly string[], startIndex: number, needle: string): number => {
  const endIndex = Math.min(startIndex + lookAheadLimit, lines.length - 1)
  for (let i = startIndex; i <= endIndex; i++) {
    if (lines[i] === needle) {
      return i
    }
  }
  return -1
}

const addContextRow = (rows: InlineDiffRow[], text: string, lineNumberLeft: number, lineNumberRight: number): void => {
  rows.push({
    lineNumberLeft,
    lineNumberRight,
    text,
    type: InlineDiffRowType.Context,
  })
}

const addDeletionRow = (rows: InlineDiffRow[], text: string, lineNumberLeft: number): void => {
  rows.push({
    lineNumberLeft,
    lineNumberRight: null,
    text,
    type: InlineDiffRowType.Deletion,
  })
}

const addInsertionRow = (rows: InlineDiffRow[], text: string, lineNumberRight: number): void => {
  rows.push({
    lineNumberLeft: null,
    lineNumberRight,
    text,
    type: InlineDiffRowType.Insertion,
  })
}

const appendDeletionsUntil = (
  rows: InlineDiffRow[],
  leftLines: readonly string[],
  leftIndex: number,
  leftMatch: number,
  leftLineNumber: number,
): { leftIndex: number; leftLineNumber: number } => {
  let nextLeftIndex = leftIndex
  let nextLeftLineNumber = leftLineNumber
  while (nextLeftIndex < leftMatch) {
    addDeletionRow(rows, leftLines[nextLeftIndex], nextLeftLineNumber)
    nextLeftIndex++
    nextLeftLineNumber++
  }
  return {
    leftIndex: nextLeftIndex,
    leftLineNumber: nextLeftLineNumber,
  }
}

const appendInsertionsUntil = (
  rows: InlineDiffRow[],
  rightLines: readonly string[],
  rightIndex: number,
  rightMatch: number,
  rightLineNumber: number,
): { rightIndex: number; rightLineNumber: number } => {
  let nextRightIndex = rightIndex
  let nextRightLineNumber = rightLineNumber
  while (nextRightIndex < rightMatch) {
    addInsertionRow(rows, rightLines[nextRightIndex], nextRightLineNumber)
    nextRightIndex++
    nextRightLineNumber++
  }
  return {
    rightIndex: nextRightIndex,
    rightLineNumber: nextRightLineNumber,
  }
}

const shouldUseLeftMatch = (leftMatch: number, rightMatch: number, leftIndex: number, rightIndex: number): boolean => {
  return leftMatch !== -1 && (rightMatch === -1 || leftMatch - leftIndex <= rightMatch - rightIndex)
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
      addContextRow(rows, leftLine, leftLineNumber, rightLineNumber)
      leftIndex++
      rightIndex++
      leftLineNumber++
      rightLineNumber++
      continue
    }

    if (leftIndex < leftLines.length && rightIndex < rightLines.length) {
      const leftMatch = findLookAheadMatch(leftLines, leftIndex + 1, rightLine)
      const rightMatch = findLookAheadMatch(rightLines, rightIndex + 1, leftLine)

      if (shouldUseLeftMatch(leftMatch, rightMatch, leftIndex, rightIndex)) {
        const nextState = appendDeletionsUntil(rows, leftLines, leftIndex, leftMatch, leftLineNumber)
        leftIndex = nextState.leftIndex
        leftLineNumber = nextState.leftLineNumber
        continue
      }

      if (rightMatch !== -1) {
        const nextState = appendInsertionsUntil(rows, rightLines, rightIndex, rightMatch, rightLineNumber)
        rightIndex = nextState.rightIndex
        rightLineNumber = nextState.rightLineNumber
        continue
      }
    }

    if (leftIndex < leftLines.length) {
      addDeletionRow(rows, leftLines[leftIndex], leftLineNumber)
      leftIndex++
      leftLineNumber++
    }

    if (rightIndex < rightLines.length) {
      addInsertionRow(rows, rightLines[rightIndex], rightLineNumber)
      rightIndex++
      rightLineNumber++
    }
  }

  return rows
}
