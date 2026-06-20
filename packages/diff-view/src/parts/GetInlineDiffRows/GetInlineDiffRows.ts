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

const getContextRow = (lineNumberLeft: number, lineNumberRight: number, text: string): InlineDiffRow => ({
  lineNumberLeft,
  lineNumberRight,
  text,
  type: InlineDiffRowType.Context,
})

const getDeletionRow = (lineNumberLeft: number, text: string): InlineDiffRow => ({
  lineNumberLeft,
  lineNumberRight: null,
  text,
  type: InlineDiffRowType.Deletion,
})

const getInsertionRow = (lineNumberRight: number, text: string): InlineDiffRow => ({
  lineNumberLeft: null,
  lineNumberRight,
  text,
  type: InlineDiffRowType.Insertion,
})

const getDeletionRows = (lines: readonly string[], startIndex: number, endIndex: number, startLineNumber: number): readonly InlineDiffRow[] => {
  const rows: InlineDiffRow[] = []
  for (let index = startIndex; index < endIndex; index++) {
    rows.push(getDeletionRow(startLineNumber + index - startIndex, lines[index]))
  }
  return rows
}

const getInsertionRows = (lines: readonly string[], startIndex: number, endIndex: number, startLineNumber: number): readonly InlineDiffRow[] => {
  const rows: InlineDiffRow[] = []
  for (let index = startIndex; index < endIndex; index++) {
    rows.push(getInsertionRow(startLineNumber + index - startIndex, lines[index]))
  }
  return rows
}

interface LookAheadRows {
  readonly leftCount: number
  readonly rightCount: number
  readonly rows: readonly InlineDiffRow[]
}

const getLookAheadRows = (
  leftLines: readonly string[],
  rightLines: readonly string[],
  leftIndex: number,
  rightIndex: number,
  leftLineNumber: number,
  rightLineNumber: number,
): LookAheadRows | undefined => {
  const leftLine = leftLines[leftIndex]
  const rightLine = rightLines[rightIndex]
  const leftMatch = findLookAheadMatch(leftLines, leftIndex + 1, rightLine)
  const rightMatch = findLookAheadMatch(rightLines, rightIndex + 1, leftLine)

  if (leftMatch !== -1 && (rightMatch === -1 || leftMatch - leftIndex <= rightMatch - rightIndex)) {
    return {
      leftCount: leftMatch - leftIndex,
      rightCount: 0,
      rows: getDeletionRows(leftLines, leftIndex, leftMatch, leftLineNumber),
    }
  }

  if (rightMatch !== -1) {
    return {
      leftCount: 0,
      rightCount: rightMatch - rightIndex,
      rows: getInsertionRows(rightLines, rightIndex, rightMatch, rightLineNumber),
    }
  }

  return undefined
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
      rows.push(getContextRow(leftLineNumber, rightLineNumber, leftLine))
      leftIndex++
      rightIndex++
      leftLineNumber++
      rightLineNumber++
      continue
    }

    if (leftIndex < leftLines.length && rightIndex < rightLines.length) {
      const lookAheadRows = getLookAheadRows(leftLines, rightLines, leftIndex, rightIndex, leftLineNumber, rightLineNumber)
      if (lookAheadRows) {
        rows.push(...lookAheadRows.rows)
        leftIndex += lookAheadRows.leftCount
        leftLineNumber += lookAheadRows.leftCount
        rightIndex += lookAheadRows.rightCount
        rightLineNumber += lookAheadRows.rightCount
        continue
      }
    }

    if (leftIndex < leftLines.length) {
      rows.push(getDeletionRow(leftLineNumber, leftLines[leftIndex]))
      leftIndex++
      leftLineNumber++
    }

    if (rightIndex < rightLines.length) {
      rows.push(getInsertionRow(rightLineNumber, rightLines[rightIndex]))
      rightIndex++
      rightLineNumber++
    }
  }

  return rows
}
