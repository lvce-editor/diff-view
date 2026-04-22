import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { getVisibleLines } from '../GetVisibleLines/GetVisibleLines.ts'

interface VisibleLinesStateInput {
  readonly contentLeft: string
  readonly contentRight: string
  readonly inlineChanges: readonly InlineDiffChange[]
  readonly maxLineY: number
  readonly minLineY: number
  readonly tokenizedLinesLeft: readonly TokenizedLine[]
  readonly tokenizedLinesRight: readonly TokenizedLine[]
  readonly totalLineCountLeft: number
  readonly totalLineCountRight: number
}

interface VisibleLinesStateOutput {
  readonly visibleLinesLeft: readonly VisibleLine[]
  readonly visibleLinesRight: readonly VisibleLine[]
}

export const getVisibleLinesState = ({
  contentLeft,
  contentRight,
  inlineChanges,
  maxLineY,
  minLineY,
  tokenizedLinesLeft,
  tokenizedLinesRight,
  totalLineCountLeft,
  totalLineCountRight,
}: VisibleLinesStateInput): VisibleLinesStateOutput => {
  return {
    visibleLinesLeft: getVisibleLines(contentLeft, totalLineCountLeft, inlineChanges, minLineY, maxLineY, 'left', tokenizedLinesLeft),
    visibleLinesRight: getVisibleLines(contentRight, totalLineCountRight, inlineChanges, minLineY, maxLineY, 'right', tokenizedLinesRight),
  }
}
