import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import { set } from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('saveState', () => {
  const uid = 1
  const defaultState = createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    expandedGroups: { '1': true, '2': false },
    maxLineY: 100,
    root: '/test',
  }
  set(uid, state, state)
  const result = saveState(uid)
  expect(result).toEqual({
    deltaY: 0,
    expandedGroups: { '1': true, '2': false },
    inputValue: '',
    maxLineY: 100,
    minLineY: 0,
    root: '/test',
  })
})
