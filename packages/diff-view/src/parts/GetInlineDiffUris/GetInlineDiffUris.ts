const inlineDiffPrefix = 'inline-diff://'
const diffSeparator = '<->'

export const getInlineDiffUris = (uri: string): readonly [string, string] => {
  if (!uri.startsWith(inlineDiffPrefix)) {
    return ['', uri]
  }
  const contentPart = uri.slice(inlineDiffPrefix.length)
  const separatorIndex = contentPart.indexOf(diffSeparator)
  if (separatorIndex === -1) {
    return ['', contentPart]
  }
  const uriLeft = contentPart.slice(0, separatorIndex)
  const uriRight = contentPart.slice(separatorIndex + diffSeparator.length)
  return [uriLeft, uriRight]
}