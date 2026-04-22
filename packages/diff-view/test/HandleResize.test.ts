import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleResize } from '../src/parts/HandleResize/HandleResize.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('handleResize updates scroll bounds and visible lines for a smaller viewport', (): void => {
  const state = {
    ...createDefaultState(),
    contentLeft: 'left-1\nleft-2\nleft-3',
    contentRight: 'right-1\nright-2\nright-3',
    deltaY: 60,
    height: 100,
    itemHeight: 20,
    leftWidth: 148,
    rightWidth: 148,
    totalLineCount: 3,
    totalLineCountLeft: 3,
    totalLineCountRight: 3,
    width: 300,
    x: 10,
    y: 10,
  }

  const result = handleResize(state, 260, 40)

  expect(result).toEqual({
    ...state,
    deltaY: 20,
    finalDeltaY: 20,
    height: 40,
    leftWidth: 128,
    maxLineY: 3,
    minLineY: 1,
    rightWidth: 128,
    scrollBarActive: true,
    scrollBarHeight: 30,
    visibleLinesLeft: [
      { lineNumber: 2, tokens: [{ text: 'left-2', type: '' }], type: VisibleLineType.Normal },
      { lineNumber: 3, tokens: [{ text: 'left-3', type: '' }], type: VisibleLineType.Normal },
    ],
    visibleLinesRight: [
      { lineNumber: 2, tokens: [{ text: 'right-2', type: '' }], type: VisibleLineType.Normal },
      { lineNumber: 3, tokens: [{ text: 'right-3', type: '' }], type: VisibleLineType.Normal },
    ],
    width: 260,
  })
})
