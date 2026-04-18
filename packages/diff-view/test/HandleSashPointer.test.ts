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

  const downState = handleSashPointerDown(state, 170, 0)
  const moveState = handleSashPointerMove(downState, 210, 0)
  const upState = handleSashPointerUp(moveState, 210, 0)

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

  const result = handleSashPointerMove(state, 30, 0)

  expect(result).toMatchObject({
    leftWidth: 50,
    rightWidth: 246,
  })
})

test('sash pointer handlers resize stacked panes vertically', (): void => {
  const state = {
    ...createDefaultState(),
    height: 300,
    layout: 'vertical' as const,
    leftWidth: 148,
    rightWidth: 148,
    y: 10,
  }

  const downState = handleSashPointerDown(state, 0, 170)
  const moveState = handleSashPointerMove(downState, 0, 210)
  const upState = handleSashPointerUp(moveState, 0, 210)

  expect(downState).toMatchObject({
    isResizing: true,
    resizeOffsetX: 0,
    resizeOffsetY: 12,
  })
  expect(moveState).toMatchObject({
    isResizing: true,
    leftWidth: 188,
    rightWidth: 108,
  })
  expect(upState).toMatchObject({
    isResizing: false,
    leftWidth: 188,
    resizeOffsetY: 0,
    rightWidth: 108,
  })
})
