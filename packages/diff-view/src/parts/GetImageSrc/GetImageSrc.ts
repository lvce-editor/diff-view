import { getPath } from '../GetPath/GetPath.ts'
import { getProtocol } from '../GetProtocol/GetProtocol.ts'
import { toFileUri } from '../ToFileUri/ToFileUri.ts'

export const getImageSrc = (uri: string): string => {
  const protocol = getProtocol(uri)
  if (protocol === 'data') {
    return `data:${getPath(protocol, uri)}`
  }
  if (protocol === 'file') {
    return toFileUri(uri)
  }
  return uri
}
