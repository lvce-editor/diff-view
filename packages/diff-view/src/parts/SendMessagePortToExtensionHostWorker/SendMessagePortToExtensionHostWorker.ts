import { RendererWorker } from '@lvce-editor/rpc-registry'

export const sendMessagePortToExtensionHostWorker = async (port: any): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionHostWorker(port, 0)
}
