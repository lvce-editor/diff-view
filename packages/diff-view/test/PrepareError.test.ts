import { expect, test } from '@jest/globals'
import { ErrorWorker } from '@lvce-editor/rpc-registry'
import { prepareError } from '../src/parts/PrepareError/PrepareError.ts'

test('prepareError returns message and stack from error worker', async (): Promise<void> => {
  const errorWorkerRpc = ErrorWorker.registerMockRpc({
    'Errors.prepare': async (error: unknown): Promise<unknown> => {
      return { message: 'prepared message', stack: 'prepared stack' }
    },
  })

  const result = await prepareError(new Error('original error'))

  expect(result).toEqual({
    codeFrame: '',
    message: 'prepared message',
    stack: 'prepared stack',
  })
  errorWorkerRpc.restore()
})

test('prepareError falls back to original error when prepared result is null', async (): Promise<void> => {
  const errorWorkerRpc = ErrorWorker.registerMockRpc({
    'Errors.prepare': async (): Promise<unknown> => {
      return null
    },
  })

  const error = new Error('original message')
  const result = await prepareError(error)

  expect(result).toEqual({
    codeFrame: '',
    message: 'original message',
    stack: expect.any(String),
  })
  errorWorkerRpc.restore()
})

test('prepareError falls back to original error when worker throws', async (): Promise<void> => {
  const errorWorkerRpc = ErrorWorker.registerMockRpc({
    'Errors.prepare': async (): Promise<unknown> => {
      throw new Error('worker error')
    },
  })

  const error = new Error('original message')
  const result = await prepareError(error)

  expect(result).toEqual({
    codeFrame: '',
    message: 'original message',
    stack: expect.any(String),
  })
  errorWorkerRpc.restore()
})

test('prepareError extracts codeFrame from prepared error', async (): Promise<void> => {
  const errorWorkerRpc = ErrorWorker.registerMockRpc({
    'Errors.prepare': async (): Promise<unknown> => {
      return { codeFrame: '  at line 10', message: '', stack: '' }
    },
  })

  const result = await prepareError('string error')

  expect(result).toEqual({
    codeFrame: '  at line 10',
    message: 'string error',
    stack: '',
  })
  errorWorkerRpc.restore()
})

test('prepareError handles non-string codeFrame', async (): Promise<void> => {
  const errorWorkerRpc = ErrorWorker.registerMockRpc({
    'Errors.prepare': async (): Promise<unknown> => {
      return { codeFrame: 123, message: 'msg', stack: 'stack' }
    },
  })

  const result = await prepareError(new Error('test'))

  expect(result).toEqual({
    codeFrame: '',
    message: 'msg',
    stack: 'stack',
  })
  errorWorkerRpc.restore()
})
