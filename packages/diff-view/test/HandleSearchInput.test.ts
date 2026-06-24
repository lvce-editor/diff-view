import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSearchInput } from '../src/parts/HandleSearchInput/HandleSearchInput.ts'

test('handleSearchInput updates the search query', async (): Promise<void> => {
  const state = createDefaultState()
  const result = await handleSearchInput(state, 'test')
  expect(result.searchQuery).toBe('test')
})

test('handleSearchInput sets an empty search query', async (): Promise<void> => {
  const state = createDefaultState()
  const result = await handleSearchInput(state, '')
  expect(result.searchQuery).toBe('')
})
