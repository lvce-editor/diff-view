import { test, expect } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewAsTree from '../src/parts/ViewAsTree/ViewAsTree.ts'

test('viewAsTree - sets viewMode to Tree', () => {
  const state: SourceControlState = createDefaultState()

  const result = ViewAsTree.viewAsTree(state)

  expect(result.viewMode).toBe(2)
})

test('viewAsTree - preserves other state properties', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    height: 200,
    id: 123,
    width: 300,
  }

  const result = ViewAsTree.viewAsTree(state)

  expect(result.viewMode).toBe(2)
  expect(result.id).toBe(123)
  expect(result.width).toBe(300)
  expect(result.height).toBe(200)
})

test('viewAsTree - changes viewMode from List to Tree', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: 1,
  }

  const result = ViewAsTree.viewAsTree(state)

  expect(result.viewMode).toBe(2)
})

test('viewAsTree - changes viewMode from Tree to Tree', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: 2,
  }

  const result = ViewAsTree.viewAsTree(state)

  expect(result.viewMode).toBe(2)
})
