import { expect, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize should set TextMeasurementWorker RPC', async (): Promise<void> => {
  const commandMap = {
    'RendererWorker.sendMessagePortToDiffWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToErrorWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToExtensionManagementWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToFileSystemWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToSyntaxHighlightingWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
    'SendMessagePortToTextMeasurementWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
  }
  RendererWorker.registerMockRpc(commandMap)

  await initialize()

  expect(typeof TextMeasurementWorker.invoke).toBe('function')
  await TextMeasurementWorker.dispose()
})
