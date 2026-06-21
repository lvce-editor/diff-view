import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { showSearch } from '../src/parts/ShowSearch/ShowSearch.ts'

test('showSearch shows search', (): void => {
  const state = createDefaultState()

  const result = showSearch(state)

  expect(result.searchVisible).toBe(true)
})
