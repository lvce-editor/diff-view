export interface StackLocationMatch {
  readonly location: string
  readonly text: string
}

const whitespaceRegex = /\s/

const isSchemeCharacter = (char: string): boolean => {
  return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9') || char === '+' || char === '.' || char === '-'
}

const isSchemeStart = (char: string): boolean => {
  return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
}

const isLocationBoundary = (stackLine: string, index: number): boolean => {
  return index === 0 || stackLine[index - 1] === '(' || whitespaceRegex.test(stackLine[index - 1])
}

const getSchemeLocationStart = (stackLine: string, locationEnd: number): number => {
  const schemeSeparator = stackLine.lastIndexOf('://', locationEnd)
  if (schemeSeparator === -1) {
    return -1
  }
  let start = schemeSeparator - 1
  while (start >= 0 && isSchemeCharacter(stackLine[start])) {
    start--
  }
  start++
  if (!isSchemeStart(stackLine[start]) || !isLocationBoundary(stackLine, start)) {
    return -1
  }
  return start
}

const getFileLocationStart = (stackLine: string, locationEnd: number): number => {
  for (let index = locationEnd - 1; index >= 0; index--) {
    if (stackLine[index] === '/' && isLocationBoundary(stackLine, index)) {
      return index
    }
  }
  return -1
}

const getLocationStart = (stackLine: string, locationEnd: number): number => {
  const schemeStart = getSchemeLocationStart(stackLine, locationEnd)
  if (schemeStart !== -1) {
    return schemeStart
  }
  return getFileLocationStart(stackLine, locationEnd)
}

const isDigits = (text: string): boolean => {
  for (const char of text) {
    if (char < '0' || char > '9') {
      return false
    }
  }
  return text.length > 0
}

export const parseStackLocation = (stackLine: string): StackLocationMatch | undefined => {
  const textEnd = stackLine.endsWith(')') ? stackLine.length - 1 : stackLine.length
  const columnSeparator = stackLine.lastIndexOf(':', textEnd - 1)
  if (columnSeparator === -1) {
    return undefined
  }
  const lineSeparator = stackLine.lastIndexOf(':', columnSeparator - 1)
  if (lineSeparator === -1) {
    return undefined
  }
  const line = stackLine.slice(lineSeparator + 1, columnSeparator)
  const column = stackLine.slice(columnSeparator + 1, textEnd)
  if (!isDigits(line) || !isDigits(column)) {
    return undefined
  }
  const locationStart = getLocationStart(stackLine, lineSeparator)
  if (locationStart === -1) {
    return undefined
  }
  return {
    location: stackLine.slice(locationStart, lineSeparator),
    text: stackLine.slice(locationStart),
  }
}
