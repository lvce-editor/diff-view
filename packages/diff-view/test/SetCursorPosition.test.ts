import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setCursorPosition } from '../src/parts/SetCursorPosition/SetCursorPosition.ts'

test('setCursorPosition updates the right editor cursor position', (): void => {
  const state = createDefaultState()

  const result = setCursorPosition(state, 3, 2)

  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 3,
    cursorRowIndex: 2,
  })
})
