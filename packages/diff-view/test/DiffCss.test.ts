import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffCss/DiffCss.ts'

test('isEqual returns false when cached scroll bar background image changes', (): void => {
  const oldState = {
    ...createDefaultState(),
    scrollBarBackgroundImage: 'none',
  }
  const newState = {
    ...oldState,
    scrollBarBackgroundImage: 'linear-gradient(to bottom, transparent 0%, red 0%, red 50%, transparent 50%)',
  }

  expect(isEqual(oldState, newState)).toBe(false)
})
