import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { clearLanguageCache, getLanguages } from '../src/parts/GetLanguages/GetLanguages.ts'

test('getLanguages returns languages from the extension worker', async (): Promise<void> => {
  clearLanguageCache()
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (platform: number, assetDir: string): Promise<readonly unknown[]> => {
      return [{ id: 'typescript', extensions: ['.ts'] }]
    },
  })

  const result = await getLanguages(1, '/assets')

  expect(result).toEqual([{ id: 'typescript', extensions: ['.ts'] }])
  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 1, '/assets']])
})

test('getLanguages caches results and returns cached on repeated calls', async (): Promise<void> => {
  clearLanguageCache()
  let callCount = 0
  ExtensionManagementWorker.registerMockRpc({
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
})

test('getLanguages bypasses cache for different platform', async (): Promise<void> => {
  clearLanguageCache()
  let callCount = 0
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (): Promise<readonly unknown[]> => {
      callCount++
      return [{ id: 'typescript', extensions: ['.ts'] }]
    },
  })

  await getLanguages(1, '/assets')
  await getLanguages(2, '/assets')

  expect(mockRpc.invocations.length).toBe(2)
  expect(callCount).toBe(2)
})

test('getLanguages returns empty array when extensions return non-array', async (): Promise<void> => {
  clearLanguageCache()
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (): Promise<unknown> => {
      return null
    },
  })

  const result = await getLanguages(1, '/assets')

  expect(result).toEqual([])
})

test('getLanguages returns empty array when extension worker throws', async (): Promise<void> => {
  clearLanguageCache()
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (): Promise<unknown> => {
      throw new Error('network error')
    },
  })

  const result = await getLanguages(1, '/assets')

  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 1, '/assets']])
  expect(result).toEqual([])
})
