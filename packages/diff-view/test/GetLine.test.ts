import { expect, test } from '@jest/globals'
import { getLine } from '../src/parts/GetVisibleLines/GetLine/GetLine.ts'

test('getLine returns an empty string for negative indices', (): void => {
  expect(getLine(['a', 'b'], -1)).toBe('')
})

test('getLine returns an empty string for indices past the end', (): void => {
  expect(getLine(['a', 'b'], 2)).toBe('')
})

test('getLine returns the requested line for valid indices', (): void => {
  expect(getLine(['a', 'b'], 1)).toBe('b')
})
