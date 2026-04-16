import { test, expect } from '@jest/globals'
import * as ScrollBarFunctions from '../src/parts/ScrollBarFunctions/ScrollBarFunctions.ts'

test('getScrollBarSize - when size is greater than or equal to contentSize, returns 0', () => {
  const result = ScrollBarFunctions.getScrollBarSize(100, 100, 10)
  expect(result).toBe(0)
})

test('getScrollBarSize - when size is less than contentSize, returns calculated size', () => {
  const result = ScrollBarFunctions.getScrollBarSize(50, 100, 10)
  expect(result).toBe(25)
})

test('getScrollBarSize - returns minimum slider size when calculated size is smaller', () => {
  const result = ScrollBarFunctions.getScrollBarSize(10, 100, 20)
  expect(result).toBe(20)
})

test('getScrollBarOffset - calculates correct offset', () => {
  const result = ScrollBarFunctions.getScrollBarOffset(10, 20, 100, 20)
  expect(result).toBe(40)
})

test('getScrollBarY - is an alias for getScrollBarOffset', () => {
  const result = ScrollBarFunctions.getScrollBarY(10, 20, 100, 20)
  expect(result).toBe(40)
})

test('getScrollBarWidth - when width is greater than longestLineWidth, returns 0', () => {
  const result = ScrollBarFunctions.getScrollBarWidth(100, 50)
  expect(result).toBe(0)
})

test('getScrollBarWidth - when width is less than longestLineWidth, returns calculated width', () => {
  const result = ScrollBarFunctions.getScrollBarWidth(50, 100)
  expect(result).toBe(25)
})

test('getNewDeltaPercent - clicked at top', () => {
  const result = ScrollBarFunctions.getNewDeltaPercent(100, 20, 5)
  expect(result).toEqual({
    handleOffset: 5,
    percent: 0,
  })
})

test('getNewDeltaPercent - clicked in middle', () => {
  const result = ScrollBarFunctions.getNewDeltaPercent(100, 20, 50)
  expect(result).toEqual({
    handleOffset: 10,
    percent: 0.5,
  })
})

test('getNewDeltaPercent - clicked at bottom', () => {
  const result = ScrollBarFunctions.getNewDeltaPercent(100, 20, 95)
  expect(result).toEqual({
    handleOffset: 15,
    percent: 1,
  })
})
