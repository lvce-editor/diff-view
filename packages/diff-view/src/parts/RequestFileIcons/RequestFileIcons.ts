import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import type { IconRequest } from '../IconRequest/IconRequest.ts'

export const requestFileIcons = async (requests: readonly IconRequest[]): Promise<readonly string[]> => {
  const results = await ParentRpc.invoke('IconTheme.getIcons', requests)
  return results
}
