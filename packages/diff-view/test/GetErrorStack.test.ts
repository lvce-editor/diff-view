import { expect, test } from '@jest/globals'
import { getErrorStack } from '../src/parts/GetErrorStack/GetErrorStack.ts'

test('getErrorStack returns the stack for errors that have one', (): void => {
  const error = new Error('boom')
  error.stack = 'stack trace'

  expect(getErrorStack(error)).toBe('stack trace')
})

test('getErrorStack returns an empty string for values without a stack', (): void => {
  expect(getErrorStack('boom')).toBe('')
})
