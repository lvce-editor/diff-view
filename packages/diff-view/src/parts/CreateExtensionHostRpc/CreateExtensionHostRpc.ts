import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { VError } from '@lvce-editor/verror'
import { sendMessagePortToExtensionHostWorker } from '../SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.ts'

export const createExtensionHostRpc = async (): Promise<void> => {
  try {
    const rpc = await TransferMessagePortRpcParent.create({
      commandMap: {},
      send: sendMessagePortToExtensionHostWorker,
    })
    ExtensionHost.set(rpc)
  } catch (error) {
    throw new VError(error, `Failed to create extension host rpc`)
  }
}
