const inlineDiffPrefix = 'inline-diff://'
const diffPrefix = 'diff://'
const diffSeparator = '<->'

const parseDiffUris = (contentPart: string): readonly [string, string] => {
  const separatorIndex = contentPart.indexOf(diffSeparator)
  if (separatorIndex === -1) {
    return ['', contentPart]
  }
  const uriLeft = contentPart.slice(0, separatorIndex)
  const uriRight = contentPart.slice(separatorIndex + diffSeparator.length)
  return [uriLeft, uriRight]
}

export const getInlineDiffUris = (uri: string): readonly [string, string] => {
  if (uri.startsWith(inlineDiffPrefix)) {
    return parseDiffUris(uri.slice(inlineDiffPrefix.length))
  }
  if (uri.startsWith(diffPrefix)) {
    return parseDiffUris(uri.slice(diffPrefix.length))
  } else {
    return ['', uri]
  }
}
