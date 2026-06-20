import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleCut } from '../src/parts/HandleCut/HandleCut.ts'

test('handleCut does not change state', (): void => {
  const state = createDefaultState()

  const result = handleCut(state)

  expect(result).toBe(state)
})
