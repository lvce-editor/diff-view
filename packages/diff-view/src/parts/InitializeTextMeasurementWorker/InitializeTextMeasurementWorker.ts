import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'

export const initializeTextMeasurementWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send(port) {
      return RendererWorker.sendMessagePortToTextMeasurementWorker(port)
    },
  })
  TextMeasurementWorker.set(rpc)
}
