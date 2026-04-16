import { ExtensionHost } from '@lvce-editor/rpc-registry'

export const getExtensions = async (): Promise<readonly any[]> => {
  return ExtensionHost.invoke('Extensions.getExtensions')
}
