import { test, expect } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderFocusContext } from '../src/parts/RenderFocusContext/RenderFocusContext.ts'

test('renderFocusContext - returns correct command with id and focus', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 5,
    id: 1,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 1, 5])
})

test('renderFocusContext - uses different id and focus values', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 10,
    id: 2,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 2, 10])
})

test('renderFocusContext - handles zero focus', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 0,
    id: 3,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 3, 0])
})

test('renderFocusContext - handles negative focus', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: -1,
    id: 4,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 4, -1])
})

test('renderFocusContext - handles large focus values', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 100,
    id: 5,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 5, 100])
})
