import { expect, test } from '@jest/globals'
import { getFileExtension } from '../src/parts/GetFileExtension/GetFileExtension.ts'

test('getFileExtension returns empty string when path has no extension', (): void => {
  expect(getFileExtension('/tmp/readme')).toBe('')
})

test('getFileExtension returns lower-case extension', (): void => {
  expect(getFileExtension('/tmp/image.PNG')).toBe('.png')
})

test('getFileExtension ignores query strings and hashes', (): void => {
  expect(getFileExtension('/tmp/image.svg?version=1#preview')).toBe('.svg')
})

test('getFileExtension uses path after protocol', (): void => {
  expect(getFileExtension('memfs:///icons/file.avif')).toBe('.avif')
})
