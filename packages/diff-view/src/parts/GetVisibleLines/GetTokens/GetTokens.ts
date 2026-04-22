import type { TokenizedLine } from '../../TokenizedLine/TokenizedLine.ts'
import type { VisibleLineToken } from '../../VisibleLine/VisibleLine.ts'

export const getTokens = (tokenizedLines: readonly TokenizedLine[], index: number, text: string): readonly VisibleLineToken[] => {
  const tokenizedLine = tokenizedLines[index]
  if (!tokenizedLine || tokenizedLine.length === 0) {
    return text ? [{ text, type: '' }] : []
  }
  const tokens: VisibleLineToken[] = []
  for (let i = 0; i < tokenizedLine.length; i += 2) {
    tokens.push({
      text: tokenizedLine[i] || '',
      type: tokenizedLine[i + 1] || '',
    })
  }
  return tokens
}
