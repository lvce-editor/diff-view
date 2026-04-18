import { getPath } from '../GetPath/GetPath.ts'
import { getProtocol } from '../GetProtocol/GetProtocol.ts'

const getFileExtension = (uri: string): string => {
  const protocol = getProtocol(uri)
  const path = getPath(protocol, uri)
  const cleanPath = path.split('?')[0].split('#')[0]
  const extensionIndex = cleanPath.lastIndexOf('.')
  if (extensionIndex === -1) {
    return ''
  }
  return cleanPath.slice(extensionIndex).toLowerCase()
}

export const getRenderMode = (uri: string, knownImageExtensions: readonly string[]): 'text' | 'image' => {
  const extension = getFileExtension(uri)
  if (knownImageExtensions.includes(extension)) {
    return 'image'
  }
  return 'text'
}
