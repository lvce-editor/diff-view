import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleWhitespace } from '../src/parts/ToggleWhitespace/ToggleWhitespace.ts'

test('toggleWhitespace enables showing whitespace', (): void => {
  const state = createDefaultState()

  const result = toggleWhitespace(state)

  expect(result.showWhitespace).toBe(true)
})

test('toggleWhitespace disables showing whitespace', (): void => {
  const state = {
    ...createDefaultState(),
    showWhitespace: true,
  }

  const result = toggleWhitespace(state)

  expect(result.showWhitespace).toBe(false)
})
