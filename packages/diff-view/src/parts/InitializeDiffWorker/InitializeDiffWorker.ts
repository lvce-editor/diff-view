import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { DiffWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const initializeDiffWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send(port) {
      return RendererWorker.sendMessagePortToDiffWorker(port, 0)
    },
  })
  DiffWorker.set(rpc)
}
