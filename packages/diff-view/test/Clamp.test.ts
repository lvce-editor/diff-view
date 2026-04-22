import { expect, test } from '@jest/globals'
import { clamp } from '../src/parts/Clamp/Clamp.ts'

test('clamp returns the value when it is within the bounds', (): void => {
  expect(clamp(5, 0, 10)).toBe(5)
})

test('clamp returns the minimum when the value is below the bounds', (): void => {
  expect(clamp(-1, 0, 10)).toBe(0)
})

test('clamp returns the maximum when the value is above the bounds', (): void => {
  expect(clamp(11, 0, 10)).toBe(10)
})