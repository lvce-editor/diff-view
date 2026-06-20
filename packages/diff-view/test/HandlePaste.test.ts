import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handlePaste } from '../src/parts/HandlePaste/HandlePaste.ts'

test('handlePaste does not change state', (): void => {
  const state = createDefaultState()

  const result = handlePaste(state)

  expect(result).toBe(state)
})
