import { expect, test } from '@jest/globals'
import { getVisibleInlineDiffRows } from '../src/parts/GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'

test('getVisibleInlineDiffRows pairs a deletion and insertion on the same row', (): void => {
  const result = getVisibleInlineDiffRows([
    { leftIndex: 0, rightIndex: 0, type: 0 },
    { leftIndex: 1, rightIndex: 1, type: 2 },
    { leftIndex: 1, rightIndex: 1, type: 1 },
  ])

  expect(result).toEqual([
    {
      leftChange: { leftIndex: 0, rightIndex: 0, type: 0 },
      rightChange: { leftIndex: 0, rightIndex: 0, type: 0 },
    },
    {
      leftChange: { leftIndex: 1, rightIndex: 1, type: 2 },
      rightChange: { leftIndex: 1, rightIndex: 1, type: 1 },
    },
  ])
})

test('getVisibleInlineDiffRows does not pair changes across a context line', (): void => {
  const result = getVisibleInlineDiffRows([
    { leftIndex: 0, rightIndex: 0, type: 0 },
    { leftIndex: 1, rightIndex: 1, type: 2 },
    { leftIndex: 2, rightIndex: 2, type: 0 },
    { leftIndex: 2, rightIndex: 2, type: 1 },
  ])

  expect(result).toEqual([
    {
      leftChange: { leftIndex: 0, rightIndex: 0, type: 0 },
      rightChange: { leftIndex: 0, rightIndex: 0, type: 0 },
    },
    {
      leftChange: { leftIndex: 1, rightIndex: 1, type: 2 },
    },
    {
      leftChange: { leftIndex: 2, rightIndex: 2, type: 0 },
      rightChange: { leftIndex: 2, rightIndex: 2, type: 0 },
    },
    {
      rightChange: { leftIndex: 2, rightIndex: 2, type: 1 },
    },
  ])
})
