import { test, expect } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewAsList from '../src/parts/ViewAsList/ViewAsList.ts'

test('viewAsList - sets viewMode to List', () => {
  const state: SourceControlState = createDefaultState()

  const result = ViewAsList.viewAsList(state)

  expect(result.viewMode).toBe(1)
})

test('viewAsList - preserves other state properties', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    height: 200,
    id: 123,
    width: 300,
  }

  const result = ViewAsList.viewAsList(state)

  expect(result.viewMode).toBe(1)
  expect(result.id).toBe(123)
  expect(result.width).toBe(300)
  expect(result.height).toBe(200)
})

test('viewAsList - changes viewMode from Tree to List', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: 2,
  }

  const result = ViewAsList.viewAsList(state)

  expect(result.viewMode).toBe(1)
})

test('viewAsList - changes viewMode from List to List', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: 1,
  }

  const result = ViewAsList.viewAsList(state)

  expect(result.viewMode).toBe(1)
})
