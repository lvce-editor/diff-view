import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getCursorPositionFromCoordinates } from '../src/parts/GetCursorPositionFromCoordinates/GetCursorPositionFromCoordinates.ts'

test('getCursorPositionFromCoordinates computes cursor position in horizontal layout', (): void => {
  const state = {
    ...createDefaultState(),
    leftWidth: 100,
    gutterWidthVariable: 18,
    x: 10,
    y: 20,
  }

  const result = getCursorPositionFromCoordinates(state, 10 + 100 + 18 + 20 + 12 + 27, 20 + 40)

  expect(result).toEqual({
    cursorColumnIndex: 3,
    cursorRowIndex: 2,
  })
})

test('getCursorPositionFromCoordinates computes cursor position in vertical layout', (): void => {
  const state = {
    ...createDefaultState(),
    gutterWidthVariable: 18,
    layout: 'vertical' as const,
    leftWidth: 100,
    x: 10,
    y: 20,
  }

  const result = getCursorPositionFromCoordinates(state, 10 + 18 + 20 + 12 + 18, 20 + 100 + 60)

  expect(result).toEqual({
    cursorColumnIndex: 2,
    cursorRowIndex: 3,
  })
})

test('getCursorPositionFromCoordinates includes minLineY', (): void => {
  const state = {
    ...createDefaultState(),
    minLineY: 5,
    x: 0,
    y: 0,
  }

  const result = getCursorPositionFromCoordinates(state, 9 + 20 + 12, 40)

  expect(result).toEqual({
    cursorColumnIndex: 0,
    cursorRowIndex: 7,
  })
})

test('getCursorPositionFromCoordinates clamps negative positions', (): void => {
  const state = {
    ...createDefaultState(),
    x: 100,
    y: 100,
  }

  const result = getCursorPositionFromCoordinates(state, 0, 0)

  expect(result).toEqual({
    cursorColumnIndex: 0,
    cursorRowIndex: 0,
  })
})
