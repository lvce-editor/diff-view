import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { VError } from '@lvce-editor/verror'
import { sendMessagePortToTextMeasurementWorker } from '../SendMessagePortToTextMeasurementWorker/SendMessagePortToTextMeasurementWorker.ts'

export const createTextMeasurementWorkerRpc = async (): Promise<void> => {
  try {
    const rpc = await TransferMessagePortRpcParent.create({
      commandMap: {},
      send: sendMessagePortToTextMeasurementWorker,
    })
    TextMeasurementWorker.set(rpc)
  } catch (error) {
    throw new VError(error, `Failed to create text measurement rpc`)
  }
}
