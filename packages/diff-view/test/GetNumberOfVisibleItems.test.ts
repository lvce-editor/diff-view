import { expect, test } from '@jest/globals'
import { getNumberOfVisibleItems } from '../src/parts/GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'

test('getNumberOfVisibleItems returns zero when item height is invalid', (): void => {
  expect(getNumberOfVisibleItems(100, 0)).toBe(0)
})

test('getNumberOfVisibleItems rounds up visible items', (): void => {
  expect(getNumberOfVisibleItems(45, 20)).toBe(3)
})

test('getNumberOfVisibleItems always returns at least one visible item', (): void => {
  expect(getNumberOfVisibleItems(1, 20)).toBe(1)
})