import { expect, test } from '@jest/globals'
import { getGutterWidthVariable } from '../src/parts/GetGutterWidthVariable/GetGutterWidthVariable.ts'

test('getGutterWidthVariable uses max line number character count times line number char width', (): void => {
  expect(getGutterWidthVariable(1)).toBe(9)
  expect(getGutterWidthVariable(99)).toBe(18)
  expect(getGutterWidthVariable(100)).toBe(27)
})
