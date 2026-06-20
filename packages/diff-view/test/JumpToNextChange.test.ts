import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { jumpToNextChange } from '../src/parts/JumpToNextChange/JumpToNextChange.ts'

test('jumpToNextChange returns state', (): void => {
  const state = createDefaultState()

  const result = jumpToNextChange(state)

  expect(result).toBe(state)
})
