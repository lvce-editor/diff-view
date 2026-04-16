import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDeltaY } from '../src/parts/SetDeltaY/SetDeltaY.ts'

test('setDeltaY - basic', async () => {
  const state: SourceControlState = createDefaultState()
  const newState = await setDeltaY(state, 100)
  expect(newState.deltaY).toBe(100)
  expect(newState.visibleItems).toBeDefined()
  expect(newState.minLineY).toBeDefined()
  expect(newState.maxLineY).toBeDefined()
})

test('setDeltaY - negative value', async () => {
  const state: SourceControlState = createDefaultState()
  const newState = await setDeltaY(state, -100)
  expect(newState.deltaY).toBe(-100)
  expect(newState.visibleItems).toBeDefined()
  expect(newState.minLineY).toBe(0)
})

test('setDeltaY - with items', async () => {
  const items: DisplayItem[] = [
    {
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: 'modified',
      file: 'file1.txt',
      groupId: '',
      icon: '',
      label: 'file1.txt',
      posInSet: 1,
      setSize: 3,
      type: 0,
    },
    {
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: 'added',
      file: 'file2.txt',
      groupId: '',
      icon: '',
      label: 'file2.txt',
      posInSet: 2,
      setSize: 3,
      type: 0,
    },
    {
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: 'deleted',
      file: 'file3.txt',
      groupId: '',
      icon: '',
      label: 'file3.txt',
      posInSet: 3,
      setSize: 3,
      type: 0,
    },
  ]
  const state: SourceControlState = {
    ...createDefaultState(),
    items,
  }
  const newState = await setDeltaY(state, 50)
  expect(newState.deltaY).toBe(50)
  expect(newState.visibleItems.length).toBeGreaterThan(0)
})
