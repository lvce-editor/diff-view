import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setLayout } from '../src/parts/SetLayout/SetLayout.ts'

test('setLayout switches to vertical mode using the available height', (): void => {
  const state = {
    ...createDefaultState(),
    height: 200,
    leftWidth: 148,
    rightWidth: 148,
    width: 300,
  }

  const result = setLayout(state, 'vertical')

  expect(result).toMatchObject({
    layout: 'vertical',
    leftWidth: 98,
    resizeOffsetX: 0,
    resizeOffsetY: 0,
    rightWidth: 98,
  })
})

test('setLayout switches back to horizontal mode using the available width', (): void => {
  const state = {
    ...createDefaultState(),
    height: 200,
    layout: 'vertical' as const,
    leftWidth: 98,
    rightWidth: 98,
    width: 300,
  }

  const result = setLayout(state, 'horizontal')

  expect(result).toMatchObject({
    layout: 'horizontal',
    leftWidth: 148,
    rightWidth: 148,
  })
})
