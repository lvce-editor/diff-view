import { expect, test } from '@jest/globals'
import { getVisibleLineType } from '../src/parts/GetVisibleLines/GetVisibleLineType/GetVisibleLineType.ts'
import * as InlineDiffChangeType from '../src/parts/InlineDiffChangeType/InlineDiffChangeType.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('getVisibleLineType marks deletions as removed on the left side', (): void => {
  expect(getVisibleLineType({ leftIndex: 1, rightIndex: -1, type: InlineDiffChangeType.Deletion }, 'left')).toBe(VisibleLineType.Removed)
})

test('getVisibleLineType keeps deletions normal on the right side', (): void => {
  expect(getVisibleLineType({ leftIndex: 1, rightIndex: -1, type: InlineDiffChangeType.Deletion }, 'right')).toBe(VisibleLineType.Normal)
})

test('getVisibleLineType marks insertions as added on the right side', (): void => {
  expect(getVisibleLineType({ leftIndex: -1, rightIndex: 1, type: InlineDiffChangeType.Insertion }, 'right')).toBe(VisibleLineType.Added)
})

test('getVisibleLineType keeps unknown change types normal', (): void => {
  expect(getVisibleLineType({ leftIndex: 0, rightIndex: 0, type: 999 }, 'left')).toBe(VisibleLineType.Normal)
})
