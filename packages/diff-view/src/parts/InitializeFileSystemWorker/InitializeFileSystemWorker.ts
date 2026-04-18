import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const initializeFileSystemWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send(port) {
      return RendererWorker.sendMessagePortToFileSystemWorker(port, 0)
    },
  })
  FileSystemWorker.set(rpc)
}
