import { ExtensionManagementWorker, FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getProtocol } from '../GetProtocol/GetProtocol.ts'
import { toFileUri } from '../ToFileUri/ToFileUri.ts'

interface FileSystemProviderResult {
  readonly found: boolean
  readonly result?: unknown
}

interface BlobLike {
  readonly text: () => Promise<string>
}

const isBlobLike = (value: unknown): value is BlobLike => {
  return typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Blob]' && 'text' in value && typeof value.text === 'function'
}

const readExtensionFile = async (protocol: string, uri: string): Promise<string> => {
  const response = (await ExtensionManagementWorker.invoke('Extensions.executeFileSystemProviderReadFile', protocol, uri)) as FileSystemProviderResult
  if (!response.found) {
    throw new Error(`no file system provider found for ${protocol}`)
  }
  if (typeof response.result === 'string') {
    return response.result
  }
  if (isBlobLike(response.result)) {
    return response.result.text()
  }
  throw new TypeError(`expected file system provider ${protocol} to return a string or Blob`)
}

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
  if (protocol === 'fetch') {
    return RendererWorker.readFile(uri)
  }
  if (protocol === 'memfs') {
    return RendererWorker.readFile(uri)
  }
  return readExtensionFile(protocol, uri)
}
