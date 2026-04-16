import { test, expect } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'

test('handleInput - updates state with input value', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    inputFontFamily: 'Arial',
    inputFontSize: 14,
    inputFontWeight: 400,
    inputLetterSpacing: 0,
    width: 200,
  }

  const result = await HandleInput.handleInput(state, 'test input')

  expect(result.inputValue).toBe('test input')
  expect(result.inputSource).toBe(InputSource.User)
  expect(typeof result.inputBoxHeight).toBe('number')
})

test('handleInput - uses custom input source', async () => {
  const state: SourceControlState = createDefaultState()

  const result = await HandleInput.handleInput(state, 'custom input', InputSource.Script)

  expect(result.inputValue).toBe('custom input')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(typeof result.inputBoxHeight).toBe('number')
})

test('handleInput - handles empty input', async () => {
  const state: SourceControlState = createDefaultState()

  const result = await HandleInput.handleInput(state, '')

  expect(result.inputValue).toBe('')
  expect(result.inputSource).toBe(InputSource.User)
  expect(typeof result.inputBoxHeight).toBe('number')
})

test('handleInput - preserves other state properties', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    id: 123,
    inputFontFamily: 'Monaco',
    inputFontSize: 16,
    inputFontWeight: 600,
    inputLetterSpacing: 1,
    width: 300,
  }

  const result = await HandleInput.handleInput(state, 'preserve test')

  expect(result.inputValue).toBe('preserve test')
  expect(result.inputSource).toBe(InputSource.User)
  expect(typeof result.inputBoxHeight).toBe('number')
  expect(result.id).toBe(123)
})
