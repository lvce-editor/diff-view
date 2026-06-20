import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleCopy } from '../src/parts/HandleCopy/HandleCopy.ts'

test('handleCopy does not change state', (): void => {
  const state = createDefaultState()

  const result = handleCopy(state)

  expect(result).toBe(state)
})
