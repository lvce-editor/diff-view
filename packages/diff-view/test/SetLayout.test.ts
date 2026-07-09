import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setLayout } from '../src/parts/SetLayout/SetLayout.ts'

test('setLayout switches to vertical mode using the available height', (): void => {
  const state = {
    ...createDefaultState(),
    height: 200,
    leftWidth: 147,
    rightWidth: 147,
    width: 300,
  }

  const result = setLayout(state, 'vertical')

  expect(result).toMatchObject({
    layout: 'vertical',
    leftWidth: 97,
    resizeOffsetX: 0,
    resizeOffsetY: 0,
    rightWidth: 97,
  })
})

test('setLayout switches back to horizontal mode using the available width', (): void => {
  const state = {
    ...createDefaultState(),
    height: 200,
    layout: 'vertical' as const,
    leftWidth: 97,
    rightWidth: 97,
    width: 300,
  }

  const result = setLayout(state, 'horizontal')

  expect(result).toMatchObject({
    layout: 'horizontal',
    leftWidth: 147,
    rightWidth: 147,
  })
})
