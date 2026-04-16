import { RendererWorker } from '@lvce-editor/rpc-registry'

export const get = (key: string): Promise<any> => {
  return RendererWorker.getPreference(key)
}
