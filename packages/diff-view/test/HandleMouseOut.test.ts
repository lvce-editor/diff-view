import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleMouseOut } from '../src/parts/HandleMouseOut/HandleMouseOut.ts'

test('handleMouseOut - returns same state when index is valid', (): void => {
  const state: SourceControlState = createDefaultState()
  const newState = handleMouseOut(state, 0)
  expect(newState).toBe(state)
})

test('handleMouseOut - returns new state when index is -1', (): void => {
  const state: SourceControlState = createDefaultState()
  const newState = handleMouseOut(state, -1)
  expect(newState).not.toBe(state)
  expect(newState).toEqual(state)
})

test('handleMouseOut - returns new state when index is greater than items length', (): void => {
  const state: SourceControlState = createDefaultState()
  const newState = handleMouseOut(state, 10)
  expect(newState).not.toBe(state)
  expect(newState).toEqual(state)
})

test('handleMouseOut - returns same state when index equals items length', (): void => {
  const state: SourceControlState = createDefaultState()
  const newState = handleMouseOut(state, state.items.length)
  expect(newState).toBe(state)
})

test('handleMouseOut - returns same state when index is within valid range', (): void => {
  const items: DisplayItem[] = [
    {
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: 'modified',
      file: '/test/file1.ts',
      groupId: '',
      icon: '',
      label: 'file1.ts',
      posInSet: 1,
      setSize: 2,
      type: 0,
    },
    {
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: 'added',
      file: '/test/file2.ts',
      groupId: '',
      icon: '',
      label: 'file2.ts',
      posInSet: 2,
      setSize: 2,
      type: 0,
    },
  ]
  const state: SourceControlState = {
    ...createDefaultState(),
    items,
  }
  const newState = handleMouseOut(state, 1)
  expect(newState).toBe(state)
})
