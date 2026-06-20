import { expect, test } from '@jest/globals'
import * as ActionName from '../src/parts/ActionName/ActionName.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAction } from '../src/parts/HandleClickAction/HandleClickAction.ts'

test('handleClickAction toggles diff mode for the mode toggle action', (): void => {
  const state = createDefaultState()

  const result = handleClickAction(state, ActionName.ToggleDiffMode)

  expect(result.diffMode).toBe('inline')
})

test('handleClickAction ignores unknown actions', (): void => {
  const state = createDefaultState()

  const result = handleClickAction(state, 'unknown')

  expect(result).toBe(state)
})
