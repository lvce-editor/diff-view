import { expect, test } from '@jest/globals'
import { getScrollBarHeight } from '../src/parts/GetScrollBarHeight/GetScrollBarHeight.ts'

test('getScrollBarHeight returns height when content height is zero', (): void => {
  expect(getScrollBarHeight(100, 0, 30)).toBe(100)
})

test('getScrollBarHeight returns full height when content fits', (): void => {
  expect(getScrollBarHeight(100, 80, 30)).toBe(100)
})

test('getScrollBarHeight respects minimum slider size', (): void => {
  expect(getScrollBarHeight(100, 1000, 30)).toBe(30)
})
