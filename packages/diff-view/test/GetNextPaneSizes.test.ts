import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getNextPaneSizes } from '../src/parts/GetNextPaneSizes/GetNextPaneSizes.ts'

test('getNextPaneSizes preserves the current pane ratio for horizontal layout', (): void => {
  const state = {
    ...createDefaultState(),
    leftWidth: 150,
    rightWidth: 50,
  }

  expect(getNextPaneSizes(state, 'horizontal', 404, 100)).toEqual({
    leftWidth: 300,
    rightWidth: 100,
  })
})

test('getNextPaneSizes uses height for vertical layout', (): void => {
  const state = {
    ...createDefaultState(),
    leftWidth: 150,
    rightWidth: 50,
  }

  expect(getNextPaneSizes(state, 'vertical', 404, 204)).toEqual({
    leftWidth: 150,
    rightWidth: 50,
  })
})

test('getNextPaneSizes falls back to equal panes without existing pane sizes', (): void => {
  const state = {
    ...createDefaultState(),
    leftWidth: 0,
    rightWidth: 0,
  }

  expect(getNextPaneSizes(state, 'horizontal', 304, 100)).toEqual({
    leftWidth: 150,
    rightWidth: 150,
  })
})
