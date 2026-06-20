import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries2 } from '../src/parts/GetMenuEntries2/GetMenuEntries2.ts'

test('getMenuEntries2', (): void => {
  const state = createDefaultState()

  const result = getMenuEntries2(state)

  expect(result.map((entry) => entry.id)).toEqual(['cut', 'copy', 'paste'])
})
