import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAt } from '../src/parts/HandleClickAt/HandleClickAt.ts'

test('handleClickAt - with name', async () => {
  const state: SourceControlState = createDefaultState()
  const result = await handleClickAt(state, 100, 100, 'test')
  expect(result).toBeDefined()
})

test('handleClickAt - without name', async () => {
  const state: SourceControlState = createDefaultState()
  const result = await handleClickAt(state, 100, 100, '')
  expect(result).toBeDefined()
})
