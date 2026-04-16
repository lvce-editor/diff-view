import { test, expect } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as ApplyRender from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('applyRender - returns empty array for empty diffResult', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = createDefaultState()
  const diffResult: readonly number[] = []

  const result = ApplyRender.applyRender(oldState, newState, diffResult)

  expect(result).toEqual([])
})

test('applyRender - returns single command for RenderItems diff type', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 1,
    inputPlaceholder: '',
    splitButtonEnabled: false,
    visibleItems: [],
  }

  const result = ApplyRender.applyRender(oldState, newState, [DiffType.RenderItems])

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual([ViewletCommand.SetDom2, 1, expect.any(Object)])
})

test('applyRender - returns single command for RenderValue diff type', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 2,
    inputValue: 'test value',
  }

  const result = ApplyRender.applyRender(oldState, newState, [DiffType.RenderValue])

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual([ViewletCommand.SetValueByName, 2, expect.any(String), 'test value'])
})

test('applyRender - returns single command for RenderCss diff type', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 3,
    inputBoxHeight: 30,
  }

  const result = ApplyRender.applyRender(oldState, newState, [DiffType.RenderCss])

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual([ViewletCommand.SetCss, 3, expect.stringContaining('--SourceControlInputHeight: 30px')])
})

test('applyRender - returns single command for RenderFocusContext diff type', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 5,
    id: 4,
  }

  const result = ApplyRender.applyRender(oldState, newState, [DiffType.RenderFocusContext])

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual([ViewletCommand.SetFocusContext, 4, 5])
})

test('applyRender - returns multiple commands for multiple diff types', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 10,
    id: 5,
    inputBoxHeight: 40,
    inputPlaceholder: '',
    inputValue: 'test',
    splitButtonEnabled: false,
    visibleItems: [],
  }

  const result = ApplyRender.applyRender(oldState, newState, [DiffType.RenderItems, DiffType.RenderValue, DiffType.RenderCss, DiffType.RenderFocusContext])

  expect(result).toHaveLength(4)
  expect(result[0]).toEqual([ViewletCommand.SetDom2, 5, expect.any(Object)])
  expect(result[1]).toEqual([ViewletCommand.SetValueByName, 5, expect.any(String), 'test'])
  expect(result[2]).toEqual([ViewletCommand.SetCss, 5, expect.stringContaining('--SourceControlInputHeight: 40px')])
  expect(result[3]).toEqual([ViewletCommand.SetFocusContext, 5, 10])
})

test('applyRender - handles duplicate diff types', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    focus: 7,
    id: 6,
  }

  const result = ApplyRender.applyRender(oldState, newState, [DiffType.RenderFocusContext, DiffType.RenderFocusContext])

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual([ViewletCommand.SetFocusContext, 6, 7])
  expect(result[1]).toEqual([ViewletCommand.SetFocusContext, 6, 7])
})
