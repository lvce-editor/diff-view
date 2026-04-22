import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const createExtensionManagementWorkerRpc = async (): Promise<Rpc> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send: (port) => RendererWorker.sendMessagePortToExtensionManagementWorker(port, 0),
  })
  return rpc
}
