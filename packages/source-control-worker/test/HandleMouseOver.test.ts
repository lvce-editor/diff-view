import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleMouseOver } from '../src/parts/HandleMouseOver/HandleMouseOver.ts'

test('handleMouseOver - returns state when index is out of bounds', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const result = await handleMouseOver(state, 0)
  expect(result).toBe(state)
})

test('handleMouseOver - returns state when index is negative', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const result = await handleMouseOver(state, -1)
  expect(result).toBe(state)
})

test('handleMouseOver - returns new state when item exists', async (): Promise<void> => {
  const item: DisplayItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test.ts',
    groupId: 'group1',
    icon: '',
    label: 'test.ts',
    posInSet: 1,
    setSize: 1,
    type: 0,
  }
  const state: SourceControlState = {
    ...createDefaultState(),
    items: [item],
  }
  const result = await handleMouseOver(state, 0)
  expect(result).not.toBe(state)
  expect(result).toEqual({
    ...state,
  })
})

test('handleMouseOver - returns new state when multiple items exist', async (): Promise<void> => {
  const item1: DisplayItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test1.ts',
    groupId: 'group1',
    icon: '',
    label: 'test1.ts',
    posInSet: 1,
    setSize: 2,
    type: 0,
  }
  const item2: DisplayItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test2.ts',
    groupId: 'group1',
    icon: '',
    label: 'test2.ts',
    posInSet: 2,
    setSize: 2,
    type: 0,
  }
  const state: SourceControlState = {
    ...createDefaultState(),
    items: [item1, item2],
  }
  const result = await handleMouseOver(state, 1)
  expect(result).not.toBe(state)
  expect(result).toEqual({
    ...state,
  })
})
