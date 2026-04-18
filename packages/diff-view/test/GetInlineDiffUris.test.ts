import { expect, test } from '@jest/globals'
import { getInlineDiffUris } from '../src/parts/GetInlineDiffUris/GetInlineDiffUris.ts'

test('getInlineDiffUris returns original uri when not inline diff', (): void => {
  expect(getInlineDiffUris('/tmp/after.txt')).toEqual(['', '/tmp/after.txt'])
})

test('getInlineDiffUris splits inline diff uris', (): void => {
  expect(getInlineDiffUris('inline-diff://data://before-content<->/tmp/after.txt')).toEqual(['data://before-content', '/tmp/after.txt'])
})

test('getInlineDiffUris returns content part when separator is missing', (): void => {
  expect(getInlineDiffUris('inline-diff://data://before-content')).toEqual(['', 'data://before-content'])
})
