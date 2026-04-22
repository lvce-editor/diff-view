import { stackLocationRegex } from '../StackLocationRegex/StackLocationRegex.ts'

export const getStackLinePrefix = (stackLine: string): string => {
  const match = stackLine.match(stackLocationRegex)
  if (!match) {
    return stackLine
  }
  return stackLine.slice(0, stackLine.length - match[0].length).replace(/\($/, '')
}
