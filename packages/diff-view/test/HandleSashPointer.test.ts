import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSashPointerDown } from '../src/parts/HandleSashPointerDown/HandleSashPointerDown.ts'
import { handleSashPointerMove } from '../src/parts/HandleSashPointerMove/HandleSashPointerMove.ts'
import { handleSashPointerUp } from '../src/parts/HandleSashPointerUp/HandleSashPointerUp.ts'

test('sash pointer handlers resize left and right panes while dragging', (): void => {
  const state = {
    ...createDefaultState(),
    leftWidth: 148,
    rightWidth: 148,
    width: 300,
    x: 10,
  }

  const downState = handleSashPointerDown(state, 170)
  const moveState = handleSashPointerMove(downState, 210)
  const upState = handleSashPointerUp(moveState, 210)

  expect(downState).toMatchObject({
    isResizing: true,
    resizeOffsetX: 12,
  })
  expect(moveState).toMatchObject({
    isResizing: true,
    leftWidth: 188,
    rightWidth: 108,
  })
  expect(upState).toMatchObject({
    isResizing: false,
    leftWidth: 188,
    resizeOffsetX: 0,
    rightWidth: 108,
  })
})

test('sash pointer move clamps widths to keep both panes visible', (): void => {
  const state = {
    ...createDefaultState(),
    isResizing: true,
    leftWidth: 148,
    resizeOffsetX: 12,
    rightWidth: 148,
    width: 300,
    x: 10,
  }

  const result = handleSashPointerMove(state, 30)

  expect(result).toMatchObject({
    leftWidth: 50,
    rightWidth: 246,
  })
})
