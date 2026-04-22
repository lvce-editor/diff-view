import { stackLocationRegex } from '../StackLocationRegex/StackLocationRegex.ts'

export const getStackLineLocation = (stackLine: string): string => {
  const match = stackLine.match(stackLocationRegex)
  if (!match) {
    return ''
  }
  const [, location] = match
  return location
}
