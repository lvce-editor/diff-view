import { expect, test } from '@jest/globals'
import type { DiffViewState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffCss/DiffCss.ts'

test('isEqual - same inputBoxHeight', () => {
  const oldState: DiffViewState = {
    ...createDefaultState(),
    inputBoxHeight: 30,
  }
  const newState: DiffViewState = {
    ...createDefaultState(),
    inputBoxHeight: 30,
  }
  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - different inputBoxHeight', () => {
  const oldState: DiffViewState = {
    ...createDefaultState(),
    inputBoxHeight: 30,
  }
  const newState: DiffViewState = {
    ...createDefaultState(),
    inputBoxHeight: 50,
  }
  expect(isEqual(oldState, newState)).toBe(false)
})

test('isEqual - zero values', () => {
  const oldState: DiffViewState = {
    ...createDefaultState(),
    inputBoxHeight: 0,
  }
  const newState: DiffViewState = {
    ...createDefaultState(),
    inputBoxHeight: 0,
  }
  expect(isEqual(oldState, newState)).toBe(true)
})
