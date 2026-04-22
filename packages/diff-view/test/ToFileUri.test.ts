import { expect, test } from '@jest/globals'
import { toFileUri } from '../src/parts/ToFileUri/ToFileUri.ts'

test('toFileUri keeps existing file uris unchanged', (): void => {
  expect(toFileUri('file:///tmp/already.txt')).toBe('file:///tmp/already.txt')
})

test('toFileUri prefixes plain posix paths with the file protocol', (): void => {
  expect(toFileUri('/tmp/hello world.txt')).toBe('file:///tmp/hello%20world.txt')
})

test('toFileUri normalizes windows paths and escapes reserved characters', (): void => {
  expect(toFileUri('C:\\tmp\\hello world#draft?.txt')).toBe('file:///C:/tmp/hello%20world%23draft%3F.txt')
})

test('toFileUri escapes hash and question mark characters in plain file paths', (): void => {
  expect(toFileUri('/tmp/hello#draft?.txt')).toBe('file:///tmp/hello%23draft%3F.txt')
})
