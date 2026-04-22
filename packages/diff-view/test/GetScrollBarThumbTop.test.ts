import { expect, test } from '@jest/globals'
import { getScrollBarThumbTop } from '../src/parts/GetScrollBarThumbTop/GetScrollBarThumbTop.ts'

test('getScrollBarThumbTop returns zero when there is no scroll range', (): void => {
  expect(getScrollBarThumbTop(40, 40, 10, 100)).toBe(0)
})

test('getScrollBarThumbTop returns zero when there is no scrollable content', (): void => {
  expect(getScrollBarThumbTop(100, 20, 10, 0)).toBe(0)
})

test('getScrollBarThumbTop scales deltaY into the scroll range', (): void => {
  expect(getScrollBarThumbTop(100, 20, 25, 50)).toBe(40)
})
