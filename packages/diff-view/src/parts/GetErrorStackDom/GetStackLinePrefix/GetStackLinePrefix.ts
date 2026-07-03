import { parseStackLocation } from '../StackLocationRegex/StackLocationRegex.ts'

const trailingOpenParenthesisRegex = /\($/

export const getStackLinePrefix = (stackLine: string): string => {
  const match = parseStackLocation(stackLine)
  if (!match) {
    return stackLine
  }
  return stackLine.slice(0, stackLine.length - match.text.length).replace(trailingOpenParenthesisRegex, '')
}
