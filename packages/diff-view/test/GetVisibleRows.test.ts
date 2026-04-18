import { expect, test } from '@jest/globals'
import { getVisibleRows } from '../src/parts/GetVisibleRows/GetVisibleRows.ts'

test('getVisibleRows returns only the requested window', (): void => {
  const result = getVisibleRows('line-1\nline-2\nline-3\nline-4', 4, 1, 3)

  expect(result).toEqual(['line-2', 'line-3'])
})

test('getVisibleRows pads short sides to keep both panes aligned', (): void => {
  const result = getVisibleRows('line-1', 4, 1, 3)

  expect(result).toEqual(['', ''])
})
