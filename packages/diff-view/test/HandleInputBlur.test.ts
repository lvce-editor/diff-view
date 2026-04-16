import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputBlur } from '../src/parts/HandleInputBlur/HandleInputBlur.ts'

test('handleInputBlur - returns state unchanged', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const result = await handleInputBlur(state)
  expect(result).toEqual(state)
})
