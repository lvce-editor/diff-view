import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { registerMockRpc } from '@lvce-editor/rpc-registry'
import { prepareError } from '../src/parts/PrepareError/PrepareError.ts'

test('prepareError returns message and stack from error worker', async (): Promise<void> => {
  const mockRpc = registerMockRpc(RpcId.ErrorWorker, {
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
  expect(mockRpc.invocations).toEqual([['Errors.prepare', expect.any(Error)]])
})

test('prepareError falls back to original error when prepared result is null', async (): Promise<void> => {
  const mockRpc = registerMockRpc(RpcId.ErrorWorker, {
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
  expect(mockRpc.invocations).toEqual([['Errors.prepare', expect.any(Error)]])
})

test('prepareError falls back to original error when worker throws', async (): Promise<void> => {
  const mockRpc = registerMockRpc(RpcId.ErrorWorker, {
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
  expect(mockRpc.invocations).toEqual([['Errors.prepare', expect.any(Error)]])
})

test('prepareError extracts codeFrame from prepared error', async (): Promise<void> => {
  const mockRpc = registerMockRpc(RpcId.ErrorWorker, {
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
  expect(mockRpc.invocations).toEqual([['Errors.prepare', 'string error']])
})

test('prepareError handles non-string codeFrame', async (): Promise<void> => {
  const mockRpc = registerMockRpc(RpcId.ErrorWorker, {
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
  expect(mockRpc.invocations).toEqual([['Errors.prepare', expect.any(Error)]])
})
