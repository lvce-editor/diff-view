import { expect, test } from '@jest/globals'
import { ExtensionHost, RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize should set ExtensionHost and TextMeasurementWorker RPCs', async (): Promise<void> => {
  const commandMap = {
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': async (): Promise<void> => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
  }
  RendererWorker.registerMockRpc(commandMap)

  await initialize()

  expect(typeof ExtensionHost.invoke).toBe('function')
  expect(typeof TextMeasurementWorker.invoke).toBe('function')
})
