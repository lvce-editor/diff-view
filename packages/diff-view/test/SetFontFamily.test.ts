import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setFontFamily } from '../src/parts/SetFontFamily/SetFontFamily.ts'

test('setFontFamily updates the font family', (): void => {
  const state = createDefaultState()
  const result = setFontFamily(state, 'monospace')
  expect(result.fontFamily).toBe('monospace')
})

test('setFontFamily returns the same state when font family has not changed', (): void => {
  const state = {
    ...createDefaultState(),
    fontFamily: 'monospace',
  }
  const result = setFontFamily(state, 'monospace')
  expect(result).toBe(state)
})
