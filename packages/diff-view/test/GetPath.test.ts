import { expect, test } from '@jest/globals'
import { getPath } from '../src/parts/GetPath/GetPath.ts'

test('getPath returns empty string for empty uri', (): void => {
  expect(getPath('file', '')).toBe('')
})

test('getPath keeps plain file paths unchanged', (): void => {
  expect(getPath('file', '/tmp/after.txt')).toBe('/tmp/after.txt')
})

test('getPath strips protocol prefix', (): void => {
  expect(getPath('data', 'data://before-content')).toBe('before-content')
})
