import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { VError } from '@lvce-editor/verror'

export const createExtensionManagementWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await TransferMessagePortRpcParent.create({
      commandMap: {},
      send: (port) => RendererWorker.sendMessagePortToExtensionManagementWorker(port, 0),
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create extension management rpc`)
  }
}
