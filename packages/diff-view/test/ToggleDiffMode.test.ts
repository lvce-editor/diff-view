import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleDiffMode } from '../src/parts/ToggleDiffMode/ToggleDiffMode.ts'

test('toggleDiffMode switches from side-by-side to inline', (): void => {
  const state = createDefaultState()

  const result = toggleDiffMode(state)

  expect(result.diffMode).toBe('inline')
})

test('toggleDiffMode switches from inline to side-by-side', (): void => {
  const state = {
    ...createDefaultState(),
    diffMode: 'inline' as const,
  }

  const result = toggleDiffMode(state)

  expect(result.diffMode).toBe('side-by-side')
})
