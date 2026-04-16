import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { RpcId } from '@lvce-editor/rpc-registry'
import { sendMessagePortToExtensionHostWorker } from '../src/parts/SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.js'

test('sendMessagePortToExtensionHostWorker', async (): Promise<void> => {
  const commandMap = {
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': async (): Promise<void> => {},
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)

  // @ts-ignore
  const port = new MessageChannel().port1
  await sendMessagePortToExtensionHostWorker(port)

  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, 'HandleMessagePort.handleMessagePort2', RpcId.SourceControlWorker],
  ])
})
