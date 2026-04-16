import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openUri = (uri: string): Promise<void> => {
  return RendererWorker.openUri(uri)
}
