import { expect, test } from '@jest/globals'
import { getErrorMessage } from '../src/parts/GetErrorMessage/GetErrorMessage.ts'

test('getErrorMessage returns the error message for Error instances', (): void => {
  expect(getErrorMessage(new Error('boom'))).toBe('boom')
})

test('getErrorMessage stringifies non-error values', (): void => {
  expect(getErrorMessage(42)).toBe('42')
})
