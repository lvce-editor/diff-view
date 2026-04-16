import { test, expect } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('renderValue - returns correct command with state values', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 1,
    inputValue: 'test input value',
  }

  const result = RenderValue.renderValue(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetValueByName, 1, InputName.SourceControlInput, 'test input value'])
})

test('renderValue - uses different input values', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 2,
    inputValue: 'different value',
  }

  const result = RenderValue.renderValue(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetValueByName, 2, InputName.SourceControlInput, 'different value'])
})

test('renderValue - handles empty input value', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 3,
    inputValue: '',
  }

  const result = RenderValue.renderValue(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetValueByName, 3, InputName.SourceControlInput, ''])
})
