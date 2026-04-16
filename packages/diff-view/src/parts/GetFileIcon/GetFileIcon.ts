import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const getFileIcon = async (name: string): Promise<string> => {
  return Rpc.invoke('IconTheme.getFileIcon', { name })
}
