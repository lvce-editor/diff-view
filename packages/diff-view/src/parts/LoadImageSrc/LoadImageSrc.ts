import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { getProtocol } from '../GetProtocol/GetProtocol.ts'
import { toFileUri } from '../ToFileUri/ToFileUri.ts'

export const loadImageSrc = async (uri: string): Promise<string> => {
  const protocol = getProtocol(uri)
  const fileUri = protocol === 'file' ? toFileUri(uri) : uri
  const blob = await FileSystemWorker.readFileAsBlob(fileUri)
  return (
    globalThis as unknown as {
      URL: {
        createObjectURL(blob: unknown): string
      }
    }
  ).URL.createObjectURL(blob)
}
