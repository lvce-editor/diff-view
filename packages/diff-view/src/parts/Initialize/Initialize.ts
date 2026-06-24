import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { createExtensionHostRpc } from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import { createTextMeasurementWorkerRpc } from '../CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'
import { getKeys, get as getDiffViewState, set as setDiffViewState } from '../DiffViewStates/DiffViewStates.ts'
import { initializeDiffWorker } from '../InitializeDiffWorker/InitializeDiffWorker.ts'
import { initializeErrorWorker } from '../InitializeErrorWorker/InitializeErrorWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeFileSystemWorker } from '../InitializeFileSystemWorker/InitializeFileSystemWorker.ts'
import { initializeSyntaxHighlightingWorker } from '../InitializeSyntaxHighlightingWorker/InitializeSyntaxHighlightingWorker.ts'
import { initializeTextMeasurementWorker } from '../InitializeTextMeasurementWorker/InitializeTextMeasurementWorker.ts'

const measureCharWidth = async (state: DiffViewState): Promise<number | undefined> => {
  const sample = 'MMMMMMMMMM'
  try {
    const result = await TextMeasurementWorker.invoke('measureText', {
      fontFamily: state.fontFamily,
      fontSize: state.fontSize,
      letterSpacing: state.letterSpacing,
      text: sample,
    })
    if (typeof result === 'number' && result > 0) {
      return result / sample.length
    }
  } catch {
    return undefined
  }
  return undefined
}

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

  if (TextMeasurementWorker && typeof TextMeasurementWorker.invoke === 'function') {
    const ids = getKeys()
    for (const id of ids) {
      const stateTuple = getDiffViewState(id)
      if (!stateTuple) {
        continue
      }
      const charWidth = await measureCharWidth(stateTuple.newState)
      if (charWidth) {
        setDiffViewState(id, stateTuple.oldState, { ...stateTuple.newState, charWidth })
      }
    }
  }
}
