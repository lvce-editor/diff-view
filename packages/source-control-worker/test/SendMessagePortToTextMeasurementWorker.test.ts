import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { sendMessagePortToTextMeasurementWorker } from '../src/parts/SendMessagePortToTextMeasurementWorker/SendMessagePortToTextMeasurementWorker.ts'

test('sendMessagePortToTextMeasurementWorker', async (): Promise<void> => {
  const commandMap = {
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)

  // @ts-ignore
  const port = new MessageChannel().port1
  await sendMessagePortToTextMeasurementWorker(port)

  expect(mockRpc.invocations.length).toBe(1)
  expect(mockRpc.invocations[0][0]).toBe('SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker')
  expect(mockRpc.invocations[0][1]).toBe(port)
})
