import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleWheel } from '../src/parts/HandleWheel/HandleWheel.ts'

test('handleWheel - adds deltaY to current deltaY', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    deltaY: 10,
  }

  const newState = await handleWheel(state, 0, 20)

  expect(newState.deltaY).toBe(30)
  expect(newState.visibleItems).toBeDefined()
  expect(newState.minLineY).toBeDefined()
  expect(newState.maxLineY).toBeDefined()
})

test('handleWheel - handles negative deltaY', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    deltaY: 50,
  }

  const newState = await handleWheel(state, 0, -30)

  expect(newState.deltaY).toBe(20)
  expect(newState.visibleItems).toBeDefined()
})

test('handleWheel - handles zero deltaY', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    deltaY: 25,
  }

  const newState = await handleWheel(state, 0, 0)

  expect(newState.deltaY).toBe(25)
  expect(newState.visibleItems).toBeDefined()
})

test('handleWheel - accepts deltaMode parameter', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()

  const newState = await handleWheel(state, 1, 10)

  expect(newState.deltaY).toBe(10)
  expect(newState.visibleItems).toBeDefined()
})

test('handleWheel - with initial zero deltaY', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()

  const newState = await handleWheel(state, 0, 15)

  expect(newState.deltaY).toBe(15)
  expect(newState.visibleItems).toBeDefined()
})

test('handleWheel - preserves other state properties', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    deltaY: 5,
    height: 300,
    id: 42,
    width: 200,
  }

  const newState = await handleWheel(state, 0, 10)

  expect(newState.deltaY).toBe(15)
  expect(newState.id).toBe(42)
  expect(newState.width).toBe(200)
  expect(newState.height).toBe(300)
})
