import { createExtensionHostRpc } from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import { createTextMeasurementWorkerRpc } from '../CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'
import { initializeDiffWorker } from '../InitializeDiffWorker/InitializeDiffWorker.ts'
import { initializeErrorWorker } from '../InitializeErrorWorker/InitializeErrorWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeFileSystemWorker } from '../InitializeFileSystemWorker/InitializeFileSystemWorker.ts'
import { initializeSyntaxHighlightingWorker } from '../InitializeSyntaxHighlightingWorker/InitializeSyntaxHighlightingWorker.ts'
import { initializeTextMeasurementWorker } from '../InitializeTextMeasurementWorker/InitializeTextMeasurementWorker.ts'

export const initialize = async (): Promise<void> => {
  await Promise.all([
    createExtensionHostRpc(),
    createTextMeasurementWorkerRpc(),
    initializeDiffWorker(),
    initializeExtensionManagementWorker(),
    initializeFileSystemWorker(),
    initializeErrorWorker(),
    initializeSyntaxHighlightingWorker(),
    initializeTextMeasurementWorker(),
  ])
}
