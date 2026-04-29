import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff } from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('diff returns the renderers for changed state groups', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 1,
    focus: 1,
    height: 200,
    inputValue: 'changed',
  }

  expect(diff(oldState, newState)).toEqual([DiffType.RenderIncremental, DiffType.RenderValue, DiffType.RenderCss, DiffType.RenderFocusContext])
})

test('diff returns no renderers when states are equal', (): void => {
  const state = createDefaultState()

  expect(diff(state, state)).toEqual([])
})

test('diff returns renderCss when diff scrollbar width changes', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    diffScrollBarWidth: 12,
  }

  expect(diff(oldState, newState)).toEqual([DiffType.RenderCss])
})
