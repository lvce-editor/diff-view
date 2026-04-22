import { expect, test } from '@jest/globals'
import { getWheelDeltaY } from '../src/parts/GetWheelDeltaY/GetWheelDeltaY.ts'

test('getWheelDeltaY returns the raw delta for pixel scrolling', (): void => {
  expect(getWheelDeltaY(0, 12, 20, 100)).toBe(12)
})

test('getWheelDeltaY scales the delta by item height for line scrolling', (): void => {
  expect(getWheelDeltaY(1, 2, 20, 100)).toBe(40)
})

test('getWheelDeltaY scales the delta by viewport height for page scrolling', (): void => {
  expect(getWheelDeltaY(2, 2, 20, 100)).toBe(200)
})
