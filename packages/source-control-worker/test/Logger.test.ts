import { expect, jest, test } from '@jest/globals'
import * as Logger from '../src/parts/Logger/Logger.ts'

test('info - calls console.info with arguments', (): void => {
  // @ts-ignore
  const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
  Logger.info('test message', 123)
  expect(consoleInfoSpy).toHaveBeenCalledWith('test message', 123)
  consoleInfoSpy.mockRestore()
})

test('warn - calls console.warn with arguments', (): void => {
  // @ts-ignore
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  Logger.warn('warning message', { key: 'value' })
  expect(consoleWarnSpy).toHaveBeenCalledWith('warning message', { key: 'value' })
  consoleWarnSpy.mockRestore()
})

test('error - calls console.error with arguments', (): void => {
  // @ts-ignore
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  Logger.error('error message', new Error('test error'))
  expect(consoleErrorSpy).toHaveBeenCalledWith('error message', expect.any(Error))
  consoleErrorSpy.mockRestore()
})

test('info - handles multiple arguments', (): void => {
  // @ts-ignore
  const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
  Logger.info('arg1', 'arg2', 'arg3', 4, true)
  expect(consoleInfoSpy).toHaveBeenCalledWith('arg1', 'arg2', 'arg3', 4, true)
  consoleInfoSpy.mockRestore()
})

test('warn - handles empty arguments', (): void => {
  // @ts-ignore
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  Logger.warn()
  expect(consoleWarnSpy).toHaveBeenCalledWith()
  consoleWarnSpy.mockRestore()
})

test('error - handles single argument', (): void => {
  // @ts-ignore
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  Logger.error('single error')
  expect(consoleErrorSpy).toHaveBeenCalledWith('single error')
  consoleErrorSpy.mockRestore()
})
