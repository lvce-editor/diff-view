import { expect, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import { openUri } from '../src/parts/OpenUri/OpenUri.ts'

test('openUri', async (): Promise<void> => {
  const commandMap = {
    'Main.openUri': async (): Promise<void> => {},
  }
  const mockRpc = ParentRpc.registerMockRpc(commandMap)
  await openUri('test-uri')
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'test-uri']])
})
