import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

test('handleContextMenu does not change state', (): void => {
  const state = createDefaultState()

  const result = handleContextMenu(state, 2, 10, 20)

  expect(result).toBe(state)
})
