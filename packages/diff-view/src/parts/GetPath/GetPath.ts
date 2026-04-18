export const getPath = (protocol: string, uri: string): string => {
  if (!uri) {
    return ''
  }
  if (protocol === 'file' && !uri.startsWith('file://')) {
    return uri
  }
  return uri.slice(protocol.length + 3)
}