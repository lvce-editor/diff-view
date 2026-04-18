import { expect, test } from '@jest/globals'
import { getLineCount } from '../src/parts/GetLineCount/GetLineCount.ts'

test('getLineCount returns 1 for empty content', (): void => {
  expect(getLineCount('')).toBe(1)
})

test('getLineCount counts newline-separated lines', (): void => {
  expect(getLineCount('first\nsecond')).toBe(2)
})
