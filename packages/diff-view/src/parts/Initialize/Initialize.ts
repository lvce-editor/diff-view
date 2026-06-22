import { createExtensionHostRpc } from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import { createTextMeasurementWorkerRpc } from '../CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'
import { initializeDiffWorker } from '../InitializeDiffWorker/InitializeDiffWorker.ts'
import { initializeErrorWorker } from '../InitializeErrorWorker/InitializeErrorWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeFileSystemWorker } from '../InitializeFileSystemWorker/InitializeFileSystemWorker.ts'
import { initializeSyntaxHighlightingWorker } from '../InitializeSyntaxHighlightingWorker/InitializeSyntaxHighlightingWorker.ts'
import { initializeTextMeasurementWorker } from '../InitializeTextMeasurementWorker/InitializeTextMeasurementWorker.ts'
import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { getCommandIds, get as getDiffViewState, set as setDiffViewState } from '../DiffViewStates/DiffViewStates.ts'

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

  try {
    // ask text measurement worker for an average character width and update existing states
    const sample = 'MMMMMMMMMM'
    if (TextMeasurementWorker && typeof TextMeasurementWorker.invoke === 'function') {
      const ids = getCommandIds()
      for (const id of ids) {
        const state = getDiffViewState(id)
        if (!state) continue
        try {
          const result = await TextMeasurementWorker.invoke('measureText', {
            text: sample,
            fontFamily: state.fontFamily,
            fontSize: state.fontSize,
            letterSpacing: state.letterSpacing,
          })
          if (typeof result === 'number' && result > 0) {
            const charWidth = result / sample.length
            setDiffViewState(id, { ...state, charWidth }, state)
          }
        } catch (error) {
          // ignore and keep defaults
        }
      }
    }
  } catch (error) {
    // ignore
  }
}
