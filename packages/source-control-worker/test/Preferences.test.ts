import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { get } from '../src/parts/Preferences/Preferences.ts'

test('get', async (): Promise<void> => {
  const commandMap = {
    'Preferences.get': async (): Promise<any> => false,
  }
  RendererWorker.registerMockRpc(commandMap)
  const result = await get('test')
  expect(result).toBe(false)
})
