import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import * as Diff from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as DiffViewStates from '../src/parts/DiffViewStates/DiffViewStates.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'
import { renderIncremental } from '../src/parts/RenderIncremental/RenderIncremental.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState returns the persisted subset of the current state', (): void => {
  const uid = 21
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 12,
    inputValue: 'saved-value',
    maxLineY: 4,
    minLineY: 1,
    root: '/tmp/project',
  }

  DiffViewStates.set(uid, oldState, newState)

  expect(saveState(uid)).toEqual({
    deltaY: 12,
    inputValue: 'saved-value',
    maxLineY: 4,
    minLineY: 1,
    root: '/tmp/project',
  })
})

test('diff2 returns the diff modules selected for the stored state pair', (): void => {
  const uid = 22
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 1,
    focus: 1,
    height: 200,
    inputValue: 'changed',
  }

  DiffViewStates.set(uid, oldState, newState)

  expect(diff2(uid)).toEqual(Diff.diff(oldState, newState))
  expect(diff2(uid)).toEqual([DiffType.RenderIncremental, DiffType.RenderValue, DiffType.RenderCss, DiffType.RenderFocusContext])
})

test('renderIncremental returns an empty patch list for identical dom trees', (): void => {
  const state = createDefaultState()

  expect(renderIncremental(state, state)).toEqual(['Viewlet.setPatches', 1, []])
})

test('render2 stores the latest state before applying render commands', (): void => {
  const uid = 23
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 2,
    inputValue: 'rendered-value',
    maxLineY: 3,
    minLineY: 1,
    root: '/tmp/rendered',
  }

  DiffViewStates.set(uid, oldState, newState)

  expect(render2(uid, [])).toEqual([])
  expect(saveState(uid)).toEqual({
    deltaY: 2,
    inputValue: 'rendered-value',
    maxLineY: 3,
    minLineY: 1,
    root: '/tmp/rendered',
  })
})
