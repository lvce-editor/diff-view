import { getPath } from '../GetPath/GetPath.ts'
import { getProtocol } from '../GetProtocol/GetProtocol.ts'

export const getFileExtension = (uri: string): string => {
  const protocol = getProtocol(uri)
  const path = getPath(protocol, uri)
  const cleanPath = path.split('?', 1)[0].split('#', 1)[0]
  const extensionIndex = cleanPath.lastIndexOf('.')
  if (extensionIndex === -1) {
    return ''
  }
  return cleanPath.slice(extensionIndex).toLowerCase()
}
