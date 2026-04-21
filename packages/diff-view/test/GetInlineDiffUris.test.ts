import { expect, test } from '@jest/globals'
import { getInlineDiffUris } from '../src/parts/GetInlineDiffUris/GetInlineDiffUris.ts'

test('getInlineDiffUris returns original uri when not inline diff', (): void => {
  expect(getInlineDiffUris('/tmp/after.txt')).toEqual(['', '/tmp/after.txt'])
})

test('getInlineDiffUris splits inline diff uris', (): void => {
  expect(getInlineDiffUris('inline-diff://data://before-content<->/tmp/after.txt')).toEqual(['data://before-content', '/tmp/after.txt'])
})

test('getInlineDiffUris splits diff uris', (): void => {
  expect(getInlineDiffUris('diff://file-a<->file-b')).toEqual(['file-a', 'file-b'])
})

test('getInlineDiffUris returns content part when separator is missing', (): void => {
  expect(getInlineDiffUris('inline-diff://data://before-content')).toEqual(['', 'data://before-content'])
})

test('getInlineDiffUris returns content part when diff separator is missing', (): void => {
  expect(getInlineDiffUris('diff://file-a')).toEqual(['', 'file-a'])
})
