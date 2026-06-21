import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { hideSearch } from '../src/parts/HideSearch/HideSearch.ts'

test('hideSearch hides search', (): void => {
  const state = {
    ...createDefaultState(),
    searchVisible: true,
  }

  const result = hideSearch(state)

  expect(result.searchVisible).toBe(false)
})
