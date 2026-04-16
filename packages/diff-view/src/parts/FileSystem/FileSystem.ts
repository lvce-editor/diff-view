import { RendererWorker } from '@lvce-editor/rpc-registry'

export const readFile = async (uri: string, encoding = 'utf8'): Promise<string> => {
  const content = await RendererWorker.readFile(uri)
  return content
}
