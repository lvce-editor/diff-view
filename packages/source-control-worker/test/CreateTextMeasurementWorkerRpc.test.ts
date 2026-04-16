import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createTextMeasurementWorkerRpc } from '../src/parts/CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'

test('createTextMeasurementWorkerRpc should create an Rpc instance', async (): Promise<void> => {
  const commandMap = {
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
  }
  RendererWorker.registerMockRpc(commandMap)

  const rpc = await createTextMeasurementWorkerRpc()

  expect(rpc).toBeDefined()
  expect(typeof rpc.invoke).toBe('function')
  expect(typeof rpc.dispose).toBe('function')
  await rpc.dispose()
})

test('createTextMeasurementWorkerRpc should wrap errors in VError', async (): Promise<void> => {
  const commandMap = {
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {
      throw new Error('Failed to send message port')
    },
  }
  RendererWorker.registerMockRpc(commandMap)

  await expect(createTextMeasurementWorkerRpc()).rejects.toThrow('Failed to create text measurement worker rpc')
})
