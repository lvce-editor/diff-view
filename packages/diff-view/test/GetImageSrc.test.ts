import { expect, test } from '@jest/globals'
import { getImageSrc } from '../src/parts/GetImageSrc/GetImageSrc.ts'

test('getImageSrc returns data uri for data protocol', (): void => {
  const result = getImageSrc('data://image/png;base64,abc')
  expect(result).toBe('data:image/png;base64,abc')
})

test('getImageSrc returns file uri for file protocol', (): void => {
  const result = getImageSrc('/tmp/image.png')
  expect(result).toBe('file:///tmp/image.png')
})

test('getImageSrc returns the uri unchanged for unknown protocols', (): void => {
  const result = getImageSrc('https://example.com/image.png')
  expect(result).toBe('https://example.com/image.png')
})
