import { test, expect } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderActions2 from '../src/parts/RenderActions2/RenderActions2.ts'

test('renderActions - returns array of virtual DOM nodes', () => {
  const state: SourceControlState = createDefaultState()

  const result = RenderActions2.renderActions(state)

  expect(Array.isArray(result)).toBe(true)
})

test('renderActions - handles different state values', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    id: 1,
  }

  const result = RenderActions2.renderActions(state)

  expect(Array.isArray(result)).toBe(true)
})

test('renderActions - returns consistent structure', () => {
  const state1: SourceControlState = createDefaultState()
  const state2: SourceControlState = {
    ...createDefaultState(),
    id: 2,
  }

  const result1 = RenderActions2.renderActions(state1)
  const result2 = RenderActions2.renderActions(state2)

  expect(Array.isArray(result1)).toBe(true)
  expect(Array.isArray(result2)).toBe(true)
})
