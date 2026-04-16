import { test, expect } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual - equal states', () => {
  const state: SourceControlState = CreateDefaultState.createDefaultState()
  const result = isEqual(state, state)
  expect(result).toBe(true)
})

test('isEqual - different allGroups', () => {
  const state1: SourceControlState = CreateDefaultState.createDefaultState()
  const state2: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    allGroups: [{ id: '1', items: [], label: 'Group 1' }],
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different deltaY', () => {
  const state1: SourceControlState = CreateDefaultState.createDefaultState()
  const state2: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 10,
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different items', () => {
  const state1: SourceControlState = CreateDefaultState.createDefaultState()
  const state2: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      {
        badgeCount: 0,
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '',
        file: 'test.js',
        groupId: '',
        icon: '',
        label: 'test.js',
        posInSet: 1,
        setSize: 1,
        type: 0,
      },
    ],
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different maxLineY', () => {
  const state1: SourceControlState = CreateDefaultState.createDefaultState()
  const state2: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    maxLineY: 5,
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different minLineY', () => {
  const state1: SourceControlState = CreateDefaultState.createDefaultState()
  const state2: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    minLineY: 2,
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different visibleItems', () => {
  const state1: SourceControlState = CreateDefaultState.createDefaultState()
  const state2: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '',
        file: 'test.js',
        fileIcon: '',
        groupId: '',
        icon: '',
        indent: 16,
        label: 'test.js',
        posInSet: 1,
        setSize: 1,
        type: 0,
      },
    ],
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - same values but different object references', () => {
  const state1: SourceControlState = CreateDefaultState.createDefaultState()
  const state2: SourceControlState = CreateDefaultState.createDefaultState()
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - multiple differences', () => {
  const state1: SourceControlState = CreateDefaultState.createDefaultState()
  const state2: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 5,
    maxLineY: 10,
    minLineY: 2,
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})
