import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { jumpToPreviousChange } from '../src/parts/JumpToPreviousChange/JumpToPreviousChange.ts'

test('jumpToPreviousChange returns state', (): void => {
  const state = createDefaultState()

  const result = jumpToPreviousChange(state)

  expect(result).toBe(state)
})
