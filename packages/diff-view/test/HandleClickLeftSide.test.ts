import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickLeftSide } from '../src/parts/HandleClickLeftSide/HandleClickLeftSide.ts'

test('handleClickLeftSide leaves focus unchanged', (): void => {
  const state = createDefaultState()

  const result = handleClickLeftSide(state)

  expect(result).toBe(state)
})
