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
      { lineNumber: 2, tokens: [{ text: 'left-2', type: '' }], type: VisibleLineType.Normal },
      { lineNumber: 3, tokens: [{ text: 'left-3', type: '' }], type: VisibleLineType.Normal },
    ],
    visibleLinesRight: [
      { lineNumber: 2, tokens: [{ text: 'right-2', type: '' }], type: VisibleLineType.Normal },
      { lineNumber: 3, tokens: [{ text: 'right-3', type: '' }], type: VisibleLineType.Normal },
    ],
  })
})

test('getVisibleLinesState hides line numbers for rows without a matching source line on that side', (): void => {
  const result = getVisibleLinesState({
    contentLeft: 'c',
    contentRight: 'a\nb\nc\nd',
    inlineChanges: [
      { leftIndex: -1, rightIndex: 0, type: 1 },
      { leftIndex: -1, rightIndex: 1, type: 1 },
      { leftIndex: 0, rightIndex: 2, type: 0 },
      { leftIndex: -1, rightIndex: 3, type: 1 },
    ],
    maxLineY: 4,
    minLineY: 0,
    tokenizedLinesLeft: [],
    tokenizedLinesRight: [],
    totalLineCountLeft: 1,
    totalLineCountRight: 4,
  })

  expect(result).toEqual({
    visibleLinesLeft: [
      { lineNumber: -1, tokens: [], type: VisibleLineType.Normal },
      { lineNumber: -1, tokens: [], type: VisibleLineType.Normal },
      { lineNumber: 1, tokens: [{ text: 'c', type: '' }], type: VisibleLineType.Normal },
      { lineNumber: -1, tokens: [], type: VisibleLineType.Normal },
    ],
    visibleLinesRight: [
      { lineNumber: 1, tokens: [{ text: 'a', type: '' }], type: VisibleLineType.Added },
      { lineNumber: 2, tokens: [{ text: 'b', type: '' }], type: VisibleLineType.Added },
      { lineNumber: 3, tokens: [{ text: 'c', type: '' }], type: VisibleLineType.Normal },
      { lineNumber: 4, tokens: [{ text: 'd', type: '' }], type: VisibleLineType.Added },
    ],
  })
})
