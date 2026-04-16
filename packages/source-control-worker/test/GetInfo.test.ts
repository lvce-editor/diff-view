import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getInfo } from '../src/parts/GetInfo/GetInfo.ts'
import { set } from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('getInfo - returns allGroups from state', (): void => {
  const uid = 1
  const defaultState = createDefaultState()
  const groups = [
    {
      id: 'group1',
      items: [],
      label: 'Group 1',
    },
    {
      id: 'group2',
      items: [],
      label: 'Group 2',
    },
  ]
  const state: SourceControlState = {
    ...defaultState,
    allGroups: groups,
  }
  set(uid, state, state)
  const result = getInfo(uid)
  expect(result).toEqual(groups)
})

test('getInfo - returns empty array when no groups', (): void => {
  const uid = 2
  const defaultState = createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    allGroups: [],
  }
  set(uid, state, state)
  const result = getInfo(uid)
  expect(result).toEqual([])
})

test('getInfo - returns groups with items', (): void => {
  const uid = 3
  const defaultState = createDefaultState()
  const groups = [
    {
      id: 'group1',
      items: [
        {
          file: 'test.js',
          label: 'test.js',
        },
      ],
      label: 'Group 1',
    },
  ]
  const state: SourceControlState = {
    ...defaultState,
    allGroups: groups,
  }
  set(uid, state, state)
  const result = getInfo(uid)
  expect(result).toEqual(groups)
  expect(result[0].items).toHaveLength(1)
})
