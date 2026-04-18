import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleWheel } from '../src/parts/HandleWheel/HandleWheel.ts'

test('handleWheel updates the shared visible row window', (): void => {
  const state = {
    ...createDefaultState(),
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    totalLineCount: 10,
  }

  const result = handleWheel(state, 1, 2)

  expect(result).toMatchObject({
    deltaY: 40,
    finalDeltaY: 140,
    maxLineY: 5,
    minLineY: 2,
    scrollBarActive: true,
    scrollBarHeight: 30,
  })
})

test('handleWheel clamps scrolling to the available range', (): void => {
  const state = {
    ...createDefaultState(),
    deltaY: 120,
    finalDeltaY: 140,
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    totalLineCount: 10,
  }

  const result = handleWheel(state, 0, 40)

  expect(result).toMatchObject({
    deltaY: 140,
    maxLineY: 10,
    minLineY: 7,
  })
})
