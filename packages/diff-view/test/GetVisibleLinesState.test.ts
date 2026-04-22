import { expect, test } from '@jest/globals'
import { getVisibleLinesState } from '../src/parts/GetVisibleLinesState/GetVisibleLinesState.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('getVisibleLinesState returns visible lines for both panes', (): void => {
  const result = getVisibleLinesState({
    contentLeft: 'left-1\nleft-2\nleft-3',
    contentRight: 'right-1\nright-2\nright-3',
    inlineChanges: [],
    maxLineY: 3,
    minLineY: 1,
    tokenizedLinesLeft: [],
    tokenizedLinesRight: [],
    totalLineCountLeft: 3,
    totalLineCountRight: 3,
  })

  expect(result).toEqual({
    visibleLinesLeft: [
      { lineNumber: 2, tokens: [], type: VisibleLineType.Normal },
      { lineNumber: 3, tokens: [], type: VisibleLineType.Normal },
    ],
    visibleLinesRight: [
      { lineNumber: 2, tokens: [], type: VisibleLineType.Normal },
      { lineNumber: 3, tokens: [], type: VisibleLineType.Normal },
    ],
  })
})
