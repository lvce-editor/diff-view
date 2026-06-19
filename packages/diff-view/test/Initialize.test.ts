import { expect, test } from '@jest/globals'
import { ExtensionHost, RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize should set ExtensionHost and TextMeasurementWorker RPCs', async (): Promise<void> => {
  const commandMap = {
    'RendererWorker.sendMessagePortToDiffWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToErrorWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToExtensionHostWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToExtensionManagementWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToFileSystemWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToSyntaxHighlightingWorker': async (): Promise<void> => {},
    'RendererWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': async (): Promise<void> => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
    'SendMessagePortToTextMeasurementWorker.sendMessagePortToTextMeasurementWorker': async (): Promise<void> => {},
  }
  RendererWorker.registerMockRpc(commandMap)

  await initialize()

  expect(typeof ExtensionHost.invoke).toBe('function')
  expect(typeof TextMeasurementWorker.invoke).toBe('function')
  await Promise.all([ExtensionHost.dispose(), TextMeasurementWorker.dispose()])
})
