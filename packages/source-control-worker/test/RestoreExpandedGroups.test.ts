import { expect, test } from '@jest/globals'
import { restoreExpandedGroups } from '../src/parts/RestoreExpandedGroups/RestoreExpandedGroups.ts'

test('restoreExpandedGroups - empty array', (): void => {
  const groups: Array<{ id: string }> = []
  const result = restoreExpandedGroups(groups)
  expect(result).toEqual({})
})

test('restoreExpandedGroups - single group', (): void => {
  const groups: Array<{ id: string }> = [
    {
      id: 'group1',
    },
  ]
  const result = restoreExpandedGroups(groups)
  expect(result).toEqual({
    group1: true,
  })
})

test('restoreExpandedGroups - multiple groups', (): void => {
  const groups: Array<{ id: string }> = [
    {
      id: 'group1',
    },
    {
      id: 'group2',
    },
    {
      id: 'group3',
    },
  ]
  const result = restoreExpandedGroups(groups)
  expect(result).toEqual({
    group1: true,
    group2: true,
    group3: true,
  })
})

test('restoreExpandedGroups - groups with full structure', (): void => {
  const groups: Array<{ id: string; label: string; items: readonly unknown[] }> = [
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
  const result = restoreExpandedGroups(groups)
  expect(result).toEqual({
    group1: true,
    group2: true,
  })
})
