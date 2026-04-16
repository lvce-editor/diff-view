import { expect, test } from '@jest/globals'
import { restoreState } from '../src/parts/RestoreState/RestoreState.ts'

test('restoreState - valid savedState with inputValue', (): void => {
  const savedState = {
    inputValue: 'test input',
  }
  const result = restoreState(savedState)
  expect(result).toEqual({
    inputValue: 'test input',
  })
})

test('restoreState - null savedState', (): void => {
  const result = restoreState(null)
  expect(result).toEqual({
    inputValue: '',
  })
})

test('restoreState - undefined savedState', (): void => {
  const result = restoreState(undefined)
  expect(result).toEqual({
    inputValue: '',
  })
})

test('restoreState - savedState is not an object', (): void => {
  const result = restoreState('not an object')
  expect(result).toEqual({
    inputValue: '',
  })
})

test('restoreState - savedState without inputValue property', (): void => {
  const savedState = {
    root: '/test',
  }
  const result = restoreState(savedState)
  expect(result).toEqual({
    inputValue: '',
  })
})

test('restoreState - savedState with inputValue that is not a string', (): void => {
  const savedState = {
    inputValue: 123,
  }
  const result = restoreState(savedState)
  expect(result).toEqual({
    inputValue: '',
  })
})

test('restoreState - empty object', (): void => {
  const result = restoreState({})
  expect(result).toEqual({
    inputValue: '',
  })
})

test('restoreState - savedState with empty string inputValue', (): void => {
  const savedState = {
    inputValue: '',
  }
  const result = restoreState(savedState)
  expect(result).toEqual({
    inputValue: '',
  })
})
