import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffRows } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { getVisibleInlineDiffRows } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'

interface SideRowMap {
  readonly displayToDocument: readonly (number | null)[]
  readonly documentToDisplay: readonly number[]
}

interface DiffRowMap {
  readonly left: SideRowMap
  readonly right: SideRowMap
}

const createSideMap = (displayToDocument: readonly (number | null)[]): SideRowMap => {
  const documentToDisplay: number[] = []
  for (let displayRow = 0; displayRow < displayToDocument.length; displayRow++) {
    const documentRow = displayToDocument[displayRow]
    if (documentRow !== null) {
      documentToDisplay[documentRow] = displayRow
    }
  }
  return { displayToDocument, documentToDisplay }
}

export const getDiffRowMap = (state: DiffViewState): DiffRowMap => {
  const { contentLeft, contentRight, diffMode, inlineChanges, totalLineCountLeft, totalLineCountRight } = state
  if (diffMode === 'inline') {
    const rows = getInlineDiffRows(contentLeft, contentRight)
    return {
      left: createSideMap(rows.map((row) => (row.lineNumberLeft === null ? null : row.lineNumberLeft - 1))),
      right: createSideMap(rows.map((row) => (row.lineNumberRight === null ? null : row.lineNumberRight - 1))),
    }
  }
  if (inlineChanges.length === 0) {
    return {
      left: createSideMap(Array.from({ length: totalLineCountLeft }, (_, index) => index)),
      right: createSideMap(Array.from({ length: totalLineCountRight }, (_, index) => index)),
    }
  }
  const rows = getVisibleInlineDiffRows(inlineChanges)
  return {
    left: createSideMap(rows.map((row) => row.leftChange?.leftIndex ?? null)),
    right: createSideMap(rows.map((row) => row.rightChange?.rightIndex ?? null)),
  }
}
