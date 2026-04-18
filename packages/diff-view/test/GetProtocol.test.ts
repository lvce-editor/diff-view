import { expect, test } from '@jest/globals'
import { getProtocol } from '../src/parts/GetProtocol/GetProtocol.ts'

test('getProtocol returns file for empty uri', (): void => {
  expect(getProtocol('')).toBe('file')
})

test('getProtocol returns parsed protocol', (): void => {
  expect(getProtocol('data://before-content')).toBe('data')
})

test('getProtocol falls back to file for plain paths', (): void => {
  expect(getProtocol('/tmp/after.txt')).toBe('file')
})
