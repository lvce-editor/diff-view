import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getLanguages } from '../src/parts/GetLanguages/GetLanguages.ts'

test('getLanguages returns languages from the extension worker', async (): Promise<void> => {
  const extensionWorkerRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (platform: number, assetDir: string): Promise<readonly unknown[]> => {
      return [{ id: 'typescript', extensions: ['.ts'] }]
    },
  })

  const result = await getLanguages(1, '/assets')

  expect(result).toEqual([{ id: 'typescript', extensions: ['.ts'] }])
  expect(extensionWorkerRpc.invocations).toEqual([['Extensions.getLanguages', 1, '/assets']])
  extensionWorkerRpc.restore()
})

test('getLanguages caches results and returns cached on repeated calls', async (): Promise<void> => {
  let callCount = 0
  const extensionWorkerRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (platform: number, assetDir: string): Promise<readonly unknown[]> => {
      callCount++
      return [{ id: 'typescript', extensions: ['.ts'] }]
    },
  })

  const result1 = await getLanguages(1, '/assets')
  const result2 = await getLanguages(1, '/assets')

  expect(result1).toEqual([{ id: 'typescript', extensions: ['.ts'] }])
  expect(result2).toEqual([{ id: 'typescript', extensions: ['.ts'] }])
  expect(callCount).toBe(1)
  extensionWorkerRpc.restore()
})

test('getLanguages bypasses cache for different platform', async (): Promise<void> => {
  let callCount = 0
  const extensionWorkerRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (): Promise<readonly unknown[]> => {
      callCount++
      return [{ id: 'typescript', extensions: ['.ts'] }]
    },
  })

  await getLanguages(1, '/assets')
  await getLanguages(2, '/assets')

  expect(callCount).toBe(2)
  extensionWorkerRpc.restore()
})

test('getLanguages returns empty array when extensions return non-array', async (): Promise<void> => {
  const extensionWorkerRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (): Promise<unknown> => {
      return null
    },
  })

  const result = await getLanguages(1, '/assets')

  expect(result).toEqual([])
  extensionWorkerRpc.restore()
})

test('getLanguages returns empty array when extension worker throws', async (): Promise<void> => {
  const extensionWorkerRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (): Promise<unknown> => {
      throw new Error('network error')
    },
  })

  const result = await getLanguages(1, '/assets')

  expect(result).toEqual([])
  extensionWorkerRpc.restore()
})
