import { ExtensionHost, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createExtensionHostRpc } from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import { createTextMeasurementWorkerRpc } from '../CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeFileSystemWorker } from '../InitializeFileSystemWorker/InitializeFileSystemWorker.ts'

export const initialize = async (): Promise<void> => {
  const [extensionHostRpc, textRpc] = await Promise.all([
    createExtensionHostRpc(),
    createTextMeasurementWorkerRpc(),
    initializeExtensionManagementWorker(),
    initializeFileSystemWorker(),
  ])
  ExtensionHost.set(extensionHostRpc)
  TextMeasurementWorker.set(textRpc)
}
