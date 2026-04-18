import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleScrollBarPointerDown } from '../src/parts/HandleScrollBarPointerDown/HandleScrollBarPointerDown.ts'
import { handleScrollBarPointerMove } from '../src/parts/HandleScrollBarPointerMove/HandleScrollBarPointerMove.ts'
import { handleScrollBarPointerUp } from '../src/parts/HandleScrollBarPointerUp/HandleScrollBarPointerUp.ts'

test('scroll bar pointer handlers drag the shared scroll position', (): void => {
  const state = {
    ...createDefaultState(),
    deltaY: 40,
    finalDeltaY: 140,
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    scrollBarActive: true,
    scrollBarHeight: 30,
    totalLineCount: 10,
    y: 10,
  }

  const downState = handleScrollBarPointerDown(state, 170 / 7)
  const moveState = handleScrollBarPointerMove(downState, 60)
  const upState = handleScrollBarPointerUp(moveState, 60)

  expect(downState).toMatchObject({
    isScrollBarDragging: true,
    scrollBarDragOffsetY: 40 / 7,
  })
  expect(moveState).toMatchObject({
    deltaY: 140,
    maxLineY: 10,
    minLineY: 7,
  })
  expect(upState).toMatchObject({
    isScrollBarDragging: false,
    scrollBarDragOffsetY: 0,
  })
})
