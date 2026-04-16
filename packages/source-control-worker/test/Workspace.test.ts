import { test, expect } from '@jest/globals'
import { pathBaseName, pathRelative } from '../src/parts/Workspace/Workspace.ts'

test('pathBaseName', () => {
  expect(pathBaseName('/test/file.txt')).toBe('file.txt')
  expect(pathBaseName('file.txt')).toBe('file.txt')
  expect(pathBaseName('/test/')).toBe('')
  expect(pathBaseName('')).toBe('')
})

test('pathRelative', () => {
  expect(pathRelative('/test/file.txt')).toBe('/test/file.txt')
  expect(pathRelative('file.txt')).toBe('file.txt')
  expect(pathRelative('')).toBe('')
})
