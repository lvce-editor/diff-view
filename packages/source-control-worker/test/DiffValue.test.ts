import { test, expect } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffValue/DiffValue.ts'

test('isEqual - returns true when newState inputSource is User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: 'old value',
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.User,
    inputValue: 'different value',
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns true when inputValues are equal and inputSource is not User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: 'same value',
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: 'same value',
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns false when inputValues differ and inputSource is not User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: 'old value',
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: 'new value',
  }

  expect(isEqual(oldState, newState)).toBe(false)
})

test('isEqual - returns true when inputValues are equal and inputSource is User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.User,
    inputValue: 'same value',
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.User,
    inputValue: 'same value',
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns true when inputValues differ but inputSource is User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.User,
    inputValue: 'old value',
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.User,
    inputValue: 'new value',
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns true when both inputValues are empty and inputSource is not User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: '',
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: '',
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns false when one inputValue is empty and inputSource is not User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: 'value',
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputSource: InputSource.Script,
    inputValue: '',
  }

  expect(isEqual(oldState, newState)).toBe(false)
})
