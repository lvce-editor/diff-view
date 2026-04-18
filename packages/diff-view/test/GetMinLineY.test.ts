import { expect, test } from '@jest/globals'
import { getMinLineY } from '../src/parts/GetMinLineY/GetMinLineY.ts'

test('getMinLineY returns zero for missing saved state', (): void => {
  expect(getMinLineY(undefined)).toBe(0)
})

test('getMinLineY returns saved minLineY value', (): void => {
  expect(getMinLineY({ minLineY: 3 })).toBe(3)
})

test('getMinLineY ignores invalid minLineY values', (): void => {
  expect(getMinLineY({ minLineY: '3' })).toBe(0)
})