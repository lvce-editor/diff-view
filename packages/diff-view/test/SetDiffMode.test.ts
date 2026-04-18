import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDiffMode } from '../src/parts/SetDiffMode/SetDiffMode.ts'

test('setDiffMode switches to inline mode and recomputes scroll state for expanded diff rows', (): void => {
  const state = {
    ...createDefaultState(),
    contentLeft: 'same\nbefore\nshared',
    contentRight: 'same\nafter\nshared',
    height: 40,
    itemHeight: 20,
    minimumSliderSize: 30,
    totalLineCount: 3,
  }

  const result = setDiffMode(state, 'inline')

  expect(result).toMatchObject({
    deltaY: 0,
    diffMode: 'inline',
    finalDeltaY: 40,
    maxLineY: 2,
    minLineY: 0,
    totalLineCount: 4,
  })
})

test('setDiffMode returns the same state when mode is unchanged', (): void => {
  const state = {
    ...createDefaultState(),
    diffMode: 'inline' as const,
  }

  const result = setDiffMode(state, 'inline')

  expect(result).toBe(state)
})
