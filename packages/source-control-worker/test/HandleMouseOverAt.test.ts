import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleMouseOverAt } from '../src/parts/HandleMouseOverAt/HandleMouseOverAt.ts'

test('handleMouseOverAt - with valid index', async (): Promise<void> => {
  const item1: DisplayItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'item1',
    groupId: 'group1',
    icon: '',
    label: 'Item 1',
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
    file: 'item2',
    groupId: 'group1',
    icon: '',
    label: 'Item 2',
    posInSet: 2,
    setSize: 2,
    type: 0,
  }
  const state: SourceControlState = {
    ...createDefaultState(),
    headerHeight: 40,
    itemHeight: 20,
    items: [item1, item2],
    y: 10,
  }
  const eventX = 50
  const eventY = 70
  const result = await handleMouseOverAt(state, eventX, eventY)
  expect(result).toBeDefined()
  expect(result).not.toBe(state)
})

test('handleMouseOverAt - with invalid index (no item)', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    headerHeight: 40,
    itemHeight: 20,
    items: [],
    y: 10,
  }
  const eventX = 50
  const eventY = 70
  const result = await handleMouseOverAt(state, eventX, eventY)
  expect(result).toBe(state)
})

test('handleMouseOverAt - with index out of bounds', async (): Promise<void> => {
  const item1: DisplayItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'item1',
    groupId: 'group1',
    icon: '',
    label: 'Item 1',
    posInSet: 1,
    setSize: 1,
    type: 0,
  }
  const state: SourceControlState = {
    ...createDefaultState(),
    headerHeight: 40,
    itemHeight: 20,
    items: [item1],
    y: 10,
  }
  const eventX = 50
  const eventY = 200
  const result = await handleMouseOverAt(state, eventX, eventY)
  expect(result).toBe(state)
})

test('handleMouseOverAt - with index at first item', async (): Promise<void> => {
  const item1: DisplayItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'item1',
    groupId: 'group1',
    icon: '',
    label: 'Item 1',
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
    file: 'item2',
    groupId: 'group1',
    icon: '',
    label: 'Item 2',
    posInSet: 2,
    setSize: 2,
    type: 0,
  }
  const state: SourceControlState = {
    ...createDefaultState(),
    headerHeight: 40,
    itemHeight: 20,
    items: [item1, item2],
    y: 0,
  }
  const eventX = 50
  const eventY = 50
  const result = await handleMouseOverAt(state, eventX, eventY)
  expect(result).toBeDefined()
  expect(result).not.toBe(state)
})
