import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getVisibleLines } from '../GetVisibleLines/GetVisibleLines.ts'

export const getVisibleLinesState = (state: DiffViewState): Pick<DiffViewState, 'visibleLinesLeft' | 'visibleLinesRight'> => {
  const { contentLeft, contentRight, inlineChanges, maxLineY, minLineY, tokenizedLinesLeft, tokenizedLinesRight, totalLineCountLeft, totalLineCountRight } = state

  return {
    visibleLinesLeft: getVisibleLines(contentLeft, totalLineCountLeft, inlineChanges, minLineY, maxLineY, 'left', tokenizedLinesLeft),
    visibleLinesRight: getVisibleLines(contentRight, totalLineCountRight, inlineChanges, minLineY, maxLineY, 'right', tokenizedLinesRight),
  }
}
