import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getBadgeCount } from '../src/parts/GetBadgeCount/GetBadgeCount.ts'

test('getBadgeCount - returns 0 for default state', (): void => {
  const state = createDefaultState()
  const result = getBadgeCount(state)
  expect(result).toBe(0)
})

test('getBadgeCount - returns correct badgeCount value', (): void => {
  const state = {
    ...createDefaultState(),
    badgeCount: 5,
  }
  const result = getBadgeCount(state)
  expect(result).toBe(5)
})

test('getBadgeCount - returns correct badgeCount for different values', (): void => {
  const state1 = {
    ...createDefaultState(),
    badgeCount: 10,
  }
  const result1 = getBadgeCount(state1)
  expect(result1).toBe(10)

  const state2 = {
    ...createDefaultState(),
    badgeCount: 100,
  }
  const result2 = getBadgeCount(state2)
  expect(result2).toBe(100)
})
