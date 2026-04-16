import { expect, test } from '@jest/globals'
import type { Group } from '../src/parts/Group/Group.ts'
import { getDisplayItemsGroup } from '../src/parts/GetDisplayItemsGroup/GetDisplayItemsGroup.ts'

test('getDisplayItemsGroup - throws error when group is missing items property', (): void => {
  const group: Group = {
    id: 'test-id',
    label: 'test-label',
    // @ts-ignore - intentionally missing items to test error handling
  } as Group
  const expandedGroups: Readonly<Record<string, boolean>> = {}
  const iconDefinitions: readonly string[] = []

  expect(() => {
    getDisplayItemsGroup(group, expandedGroups, iconDefinitions)
  }).toThrow('Source control group is missing an items property')
})
