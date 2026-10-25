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

test('scroll bar track pointer down jumps to the clicked position and preserves dragging', (): void => {
  const state = {
    ...createDefaultState(),
    finalDeltaY: 140,
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    scrollBarActive: true,
    scrollBarHeight: 30,
    totalLineCount: 10,
    y: 10,
  }

  const downState = handleScrollBarPointerDown(state, 55)
  const moveState = handleScrollBarPointerMove(downState, 60)

  expect(downState).toMatchObject({
    deltaY: 140,
    isScrollBarDragging: true,
    minLineY: 7,
    scrollBarDragOffsetY: 15,
  })
  expect(moveState.deltaY).toBe(140)
})

test('scroll bar track pointer down clamps to the top and ignores a non-scrollable bar', (): void => {
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

  const topState = handleScrollBarPointerDown(state, 11)
  const inactive = { ...state, scrollBarActive: false }
  const inactiveState = handleScrollBarPointerDown(inactive, 55)

  expect(topState).toMatchObject({ deltaY: 0, isScrollBarDragging: true, minLineY: 0, scrollBarDragOffsetY: 1 })
  expect(inactiveState).toBe(inactive)
})
