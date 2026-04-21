import { ExtensionHost, FileSystemWorker } from '@lvce-editor/rpc-registry'
import { getPath } from '../GetPath/GetPath.ts'
import { getProtocol } from '../GetProtocol/GetProtocol.ts'
import { toFileUri } from '../ToFileUri/ToFileUri.ts'

export const readFile = async (uri: string): Promise<string> => {
  if (!uri || uri.startsWith('untitled://')) {
    return ''
  }
  const protocol = getProtocol(uri)
  if (protocol === 'data') {
    return uri.slice('data://'.length)
  }
  if (protocol === 'file') {
    return FileSystemWorker.readFile(toFileUri(uri))
  }
  const path = getPath(protocol, uri)
  if (protocol === 'memfs') {
    return ExtensionHost.invoke('FileSystemMemory.readFile', path)
  }
  return ExtensionHost.invoke('ExtensionHostFileSystem.readFile', protocol, path)
}
