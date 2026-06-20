import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { getPath } from '../GetPath/GetPath.ts'
import { getProtocol } from '../GetProtocol/GetProtocol.ts'
import { toFileUri } from '../ToFileUri/ToFileUri.ts'

const readImageContent = async (uri: string, protocol: string): Promise<unknown> => {
  const readUri = protocol === 'file' ? getPath(protocol, uri) : uri
  try {
    return await FileSystemWorker.invoke('FileSystem.readFileAsBuffer', readUri)
  } catch {
    const fileUri = protocol === 'file' ? toFileUri(uri) : uri
    return FileSystemWorker.readFile(fileUri)
  }
}

export const loadImageSrc = async (uri: string): Promise<string> => {
  const protocol = getProtocol(uri)
  const content = await readImageContent(uri, protocol)
  const blob = new (
    globalThis as unknown as {
      Blob: new (parts: readonly unknown[]) => unknown
    }
  ).Blob([content])
  return (
    globalThis as unknown as {
      URL: {
        createObjectURL(blob: unknown): string
      }
    }
  ).URL.createObjectURL(blob)
}
