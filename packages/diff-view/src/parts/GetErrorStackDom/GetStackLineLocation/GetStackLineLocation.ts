import { parseStackLocation } from '../StackLocationRegex/StackLocationRegex.ts'

export const getStackLineLocation = (stackLine: string): string => {
  const match = parseStackLocation(stackLine)
  if (!match) {
    return ''
  }
  return match.location
}
