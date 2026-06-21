import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { moveCursorDown, moveCursorLeft, moveCursorRight, moveCursorToEndOfLine, moveCursorToStartOfLine, moveCursorUp } from '../src/parts/MoveCursor/MoveCursor.ts'

test('moveCursorLeft moves left within a line', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'alpha',
    rightEditor: {
      cursorColumnIndex: 3,
      cursorRowIndex: 0,
    },
  }

  const result = moveCursorLeft(state)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 2,
    cursorRowIndex: 0,
  })
})

test('moveCursorLeft wraps to the previous line', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'alpha\nbeta',
    rightEditor: {
      cursorColumnIndex: 0,
      cursorRowIndex: 1,
    },
  }

  const result = moveCursorLeft(state)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 5,
    cursorRowIndex: 0,
  })
})

test('moveCursorRight moves right within a line', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'alpha',
    rightEditor: {
      cursorColumnIndex: 3,
      cursorRowIndex: 0,
    },
  }

  const result = moveCursorRight(state)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 4,
    cursorRowIndex: 0,
  })
})

test('moveCursorRight wraps to the next line', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'alpha\nbeta',
    rightEditor: {
      cursorColumnIndex: 5,
      cursorRowIndex: 0,
    },
  }

  const result = moveCursorRight(state)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 0,
    cursorRowIndex: 1,
  })
})

test('moveCursorUp clamps the column to the target line length', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'a\nbeta',
    rightEditor: {
      cursorColumnIndex: 4,
      cursorRowIndex: 1,
    },
  }

  const result = moveCursorUp(state)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 1,
    cursorRowIndex: 0,
  })
})

test('moveCursorDown clamps the column to the target line length', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'alpha\nb',
    rightEditor: {
      cursorColumnIndex: 5,
      cursorRowIndex: 0,
    },
  }

  const result = moveCursorDown(state)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 1,
    cursorRowIndex: 1,
  })
})

test('moveCursorToStartOfLine moves to column zero', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'alpha',
    rightEditor: {
      cursorColumnIndex: 3,
      cursorRowIndex: 0,
    },
  }

  const result = moveCursorToStartOfLine(state)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 0,
    cursorRowIndex: 0,
  })
})

test('moveCursorToEndOfLine moves to the current line end', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'alpha\nbeta',
    rightEditor: {
      cursorColumnIndex: 2,
      cursorRowIndex: 1,
    },
  }

  const result = moveCursorToEndOfLine(state)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 4,
    cursorRowIndex: 1,
  })
})

test('cursor movement returns the same state at a boundary', (): void => {
  const state = createDefaultState()

  const result = moveCursorLeft(state)

  expect(result).toBe(state)
})
