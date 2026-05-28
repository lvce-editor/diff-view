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

const shouldUseLeftMatch = (leftMatch: number, rightMatch: number, leftIndex: number, rightIndex: number): boolean => {
  return leftMatch !== -1 && (rightMatch === -1 || leftMatch - leftIndex <= rightMatch - rightIndex)
}

const hasMatchingLines = (
  leftLines: readonly string[],
  rightLines: readonly string[],
  leftIndex: number,
  rightIndex: number,
): boolean => {
  return leftIndex < leftLines.length && rightIndex < rightLines.length
}

export const getInlineDiffRows = (contentLeft: string, contentRight: string): readonly InlineDiffRow[] => {
  const leftLines = getLines(contentLeft)
  const rightLines = getLines(contentRight)
  const rows: InlineDiffRow[] = []

  const addContextRow = (text: string, lineNumberLeft: number, lineNumberRight: number): void => {
    rows.push({
      lineNumberLeft,
      lineNumberRight,
      text,
      type: InlineDiffRowType.Context,
    })
  }

  const addDeletionRow = (text: string, lineNumberLeft: number): void => {
    rows.push({
      lineNumberLeft,
      lineNumberRight: null,
      text,
      type: InlineDiffRowType.Deletion,
    })
  }

  const addInsertionRow = (text: string, lineNumberRight: number): void => {
    rows.push({
      lineNumberLeft: null,
      lineNumberRight,
      text,
      type: InlineDiffRowType.Insertion,
    })
  }

  const appendDeletionsUntil = (leftIndex: number, leftMatch: number, leftLineNumber: number): { leftIndex: number; leftLineNumber: number } => {
    let nextLeftIndex = leftIndex
    let nextLeftLineNumber = leftLineNumber
    while (nextLeftIndex < leftMatch) {
      addDeletionRow(leftLines[nextLeftIndex], nextLeftLineNumber)
      nextLeftIndex++
      nextLeftLineNumber++
    }
    return {
      leftIndex: nextLeftIndex,
      leftLineNumber: nextLeftLineNumber,
    }
  }

  const appendInsertionsUntil = (rightIndex: number, rightMatch: number, rightLineNumber: number): { rightIndex: number; rightLineNumber: number } => {
    let nextRightIndex = rightIndex
    let nextRightLineNumber = rightLineNumber
    while (nextRightIndex < rightMatch) {
      addInsertionRow(rightLines[nextRightIndex], nextRightLineNumber)
      nextRightIndex++
      nextRightLineNumber++
    }
    return {
      rightIndex: nextRightIndex,
      rightLineNumber: nextRightLineNumber,
    }
  }

  let leftIndex = 0
  let rightIndex = 0
  let leftLineNumber = 1
  let rightLineNumber = 1

  const appendLookAheadRows = (): boolean => {
    if (!hasMatchingLines(leftLines, rightLines, leftIndex, rightIndex)) {
      return false
    }

    const leftLine = leftLines[leftIndex]
    const rightLine = rightLines[rightIndex]
    const leftMatch = findLookAheadMatch(leftLines, leftIndex + 1, rightLine)
    const rightMatch = findLookAheadMatch(rightLines, rightIndex + 1, leftLine)

    if (shouldUseLeftMatch(leftMatch, rightMatch, leftIndex, rightIndex)) {
      ;({ leftIndex, leftLineNumber } = appendDeletionsUntil(leftIndex, leftMatch, leftLineNumber))
      return true
    }

    if (rightMatch === -1) {
      return false
    }

    ;({ rightIndex, rightLineNumber } = appendInsertionsUntil(rightIndex, rightMatch, rightLineNumber))
    return true
  }

  while (leftIndex < leftLines.length || rightIndex < rightLines.length) {
    const leftLine = leftLines[leftIndex]
    const rightLine = rightLines[rightIndex]

    if (hasMatchingLines(leftLines, rightLines, leftIndex, rightIndex) && leftLine === rightLine) {
      addContextRow(leftLine, leftLineNumber, rightLineNumber)
      leftIndex++
      rightIndex++
      leftLineNumber++
      rightLineNumber++
      continue
    }

    if (appendLookAheadRows()) {
      continue
    }

    if (leftIndex < leftLines.length) {
      addDeletionRow(leftLines[leftIndex], leftLineNumber)
      leftIndex++
      leftLineNumber++
    }

    if (rightIndex < rightLines.length) {
      addInsertionRow(rightLines[rightIndex], rightLineNumber)
      rightIndex++
      rightLineNumber++
    }
  }

  return rows
}
