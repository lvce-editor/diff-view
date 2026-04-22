import { expect, test } from '@jest/globals'
import { getScrollBarBackgroundImage } from '../src/parts/GetScrollBarBackgroundImage/GetScrollBarBackgroundImage.ts'

test('getScrollBarBackgroundImage renders added and deleted scrollbar markers', (): void => {
  expect(
    getScrollBarBackgroundImage(
      [
        { leftIndex: 0, rightIndex: 0, type: 2 },
        { leftIndex: 1, rightIndex: 1, type: 2 },
        { leftIndex: 2, rightIndex: 2, type: 0 },
        { leftIndex: 3, rightIndex: 3, type: 1 },
        { leftIndex: 4, rightIndex: 4, type: 1 },
      ],
      5,
    ),
  ).toBe(
    'linear-gradient(to bottom, transparent 0%, rgba(248, 81, 73, 0.72) 0%, rgba(248, 81, 73, 0.72) 40%, transparent 40%), linear-gradient(to bottom, transparent 60%, rgba(46, 160, 67, 0.72) 60%, rgba(46, 160, 67, 0.72) 100%, transparent 100%)',
  )
})

test('getScrollBarBackgroundImage returns none when there are no changes', (): void => {
  expect(getScrollBarBackgroundImage([], 0)).toBe('none')
  expect(getScrollBarBackgroundImage([], 4)).toBe('none')
})

test('getScrollBarBackgroundImage rounds percentage markers to four decimals', (): void => {
  expect(getScrollBarBackgroundImage([{ leftIndex: 1, rightIndex: 1, type: 1 }], 250000)).toBe(
    'linear-gradient(to bottom, transparent 0%, rgba(46, 160, 67, 0.72) 0%, rgba(46, 160, 67, 0.72) 0.0004%, transparent 0.0004%)',
  )
})
