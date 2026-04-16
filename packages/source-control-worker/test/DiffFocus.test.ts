import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffFocus/DiffFocus.ts'

test('isEqual - same focus', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    focus: 5,
  }
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 5,
  }
  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - different focus', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    focus: 5,
  }
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 10,
  }
  expect(isEqual(oldState, newState)).toBe(false)
})

test('isEqual - zero values', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    focus: 0,
  }
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 0,
  }
  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - negative values', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    focus: -1,
  }
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: -1,
  }
  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - different negative values', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    focus: -1,
  }
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: -2,
  }
  expect(isEqual(oldState, newState)).toBe(false)
})
