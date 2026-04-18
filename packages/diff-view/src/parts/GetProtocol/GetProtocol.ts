const protocolRegex = /^([a-z-]+):\/\//

export const getProtocol = (uri: string): string => {
  if (!uri) {
    return 'file'
  }
  const match = uri.match(protocolRegex)
  if (match) {
    return match[1]
  }
  return 'file'
}
