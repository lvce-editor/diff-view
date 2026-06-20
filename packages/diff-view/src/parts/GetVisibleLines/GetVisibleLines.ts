import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import type { VisibleLineToken } from '../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getVisibleInlineDiffRows } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'
import * as InlineDiffChangeType from '../InlineDiffChangeType/InlineDiffChangeType.ts'
import { VisibleLineType as VisibleLineTypeValue } from '../VisibleLine/VisibleLine.ts'
import { getLine } from './GetLine/GetLine.ts'
import { getTokens } from './GetTokens/GetTokens.ts'
import { getVisibleLineType } from './GetVisibleLineType/GetVisibleLineType.ts'

type DiffSide = 'left' | 'right'

interface CharacterRange {
  readonly start: number
  readonly end: number
}

const maxInlineDiffMatrixSize = 10_000

const getInlineChangeLineIndex = (inlineChange: InlineDiffChange | undefined, side: DiffSide): number => {
  if (!inlineChange) {
    return -1
  }
  if (side === 'left') {
    return inlineChange.leftIndex
  }
  return inlineChange.rightIndex
}

const getCommonPrefixLength = (chars: readonly string[], otherChars: readonly string[]): number => {
  const max = Math.min(chars.length, otherChars.length)
  let index = 0
  while (index < max && chars[index] === otherChars[index]) {
    index++
  }
  return index
}

const getCommonSuffixLength = (chars: readonly string[], otherChars: readonly string[], prefixLength: number): number => {
  const max = Math.min(chars.length, otherChars.length) - prefixLength
  let index = 0
  while (index < max && chars[chars.length - index - 1] === otherChars[otherChars.length - index - 1]) {
    index++
  }
  return index
}

const getCharacterOffset = (chars: readonly string[], endIndex: number): number => {
  let offset = 0
  for (let index = 0; index < endIndex; index++) {
    offset += chars[index].length
  }
  return offset
}

const getChangedRangesFallback = (chars: readonly string[], prefixLength: number, suffixLength: number): readonly CharacterRange[] => {
  const start = getCharacterOffset(chars, prefixLength)
  const end = getCharacterOffset(chars, chars.length - suffixLength)
  if (start === end) {
    return []
  }
  return [{ start, end }]
}

const getChangedRanges = (text: string, otherText: string): readonly CharacterRange[] => {
  if (text === otherText) {
    return []
  }
  const chars = Array.from(text)
  const otherChars = Array.from(otherText)
  const prefixLength = getCommonPrefixLength(chars, otherChars)
  const suffixLength = getCommonSuffixLength(chars, otherChars, prefixLength)
  const diffLength = chars.length - prefixLength - suffixLength
  const otherDiffLength = otherChars.length - prefixLength - suffixLength
  if (diffLength <= 0) {
    return []
  }
  if (diffLength * otherDiffLength > maxInlineDiffMatrixSize) {
    return getChangedRangesFallback(chars, prefixLength, suffixLength)
  }

  const diffChars = chars.slice(prefixLength, chars.length - suffixLength)
  const diffOtherChars = otherChars.slice(prefixLength, otherChars.length - suffixLength)
  const rowCount = diffChars.length + 1
  const columnCount = diffOtherChars.length + 1
  const lengths = Array.from({ length: rowCount }, (): number[] => Array(columnCount).fill(0))
  for (let row = diffChars.length - 1; row >= 0; row--) {
    for (let column = diffOtherChars.length - 1; column >= 0; column--) {
      lengths[row][column] =
        diffChars[row] === diffOtherChars[column] ? lengths[row + 1][column + 1] + 1 : Math.max(lengths[row + 1][column], lengths[row][column + 1])
    }
  }

  const ranges: CharacterRange[] = []
  let row = 0
  let column = 0
  let offset = getCharacterOffset(chars, prefixLength)
  let rangeStart = -1
  const finishRange = (): void => {
    if (rangeStart !== -1 && rangeStart !== offset) {
      ranges.push({ start: rangeStart, end: offset })
    }
    rangeStart = -1
  }

  while (row < diffChars.length && column < diffOtherChars.length) {
    if (diffChars[row] === diffOtherChars[column]) {
      finishRange()
      offset += diffChars[row].length
      row++
      column++
      continue
    }
    if (lengths[row + 1][column] >= lengths[row][column + 1]) {
      if (rangeStart === -1) {
        rangeStart = offset
      }
      offset += diffChars[row].length
      row++
      continue
    }
    column++
  }
  while (row < diffChars.length) {
    if (rangeStart === -1) {
      rangeStart = offset
    }
    offset += diffChars[row].length
    row++
  }
  finishRange()
  return ranges
}

const mergeChangedClassName = (className: string): string => {
  if (!className) {
    return ClassNames.DiffTokenChanged
  }
  return `${className} ${ClassNames.DiffTokenChanged}`
}

const applyChangedRanges = (tokens: readonly VisibleLineToken[], ranges: readonly CharacterRange[]): readonly VisibleLineToken[] => {
  if (ranges.length === 0) {
    return tokens
  }
  const changedTokens: VisibleLineToken[] = []
  let tokenStart = 0
  let rangeIndex = 0

  for (const token of tokens) {
    const tokenEnd = tokenStart + token.text.length
    let cursor = tokenStart
    while (rangeIndex < ranges.length && ranges[rangeIndex].end <= tokenStart) {
      rangeIndex++
    }
    let nextRangeIndex = rangeIndex
    while (nextRangeIndex < ranges.length && ranges[nextRangeIndex].start < tokenEnd) {
      const range = ranges[nextRangeIndex]
      const changedStart = Math.max(range.start, tokenStart)
      const changedEnd = Math.min(range.end, tokenEnd)
      if (cursor < changedStart) {
        changedTokens.push({
          text: token.text.slice(cursor - tokenStart, changedStart - tokenStart),
          type: token.type,
        })
      }
      if (changedStart < changedEnd) {
        changedTokens.push({
          text: token.text.slice(changedStart - tokenStart, changedEnd - tokenStart),
          type: mergeChangedClassName(token.type),
        })
      }
      cursor = changedEnd
      if (range.end <= tokenEnd) {
        nextRangeIndex++
      } else {
        break
      }
    }
    if (cursor < tokenEnd) {
      changedTokens.push({
        text: token.text.slice(cursor - tokenStart),
        type: token.type,
      })
    }
    tokenStart = tokenEnd
  }

  return changedTokens.filter((token) => token.text.length > 0)
}

const isPairedChange = (visibleRow: ReturnType<typeof getVisibleInlineDiffRows>[number]): boolean => {
  return visibleRow.leftChange?.type === InlineDiffChangeType.Deletion && visibleRow.rightChange?.type === InlineDiffChangeType.Insertion
}

export const getVisibleLines = (
  content: string,
  otherContent: string,
  totalLineCount: number,
  inlineChanges: readonly InlineDiffChange[],
  minLineY: number,
  maxLineY: number,
  side: DiffSide,
  tokenizedLines: readonly TokenizedLine[] = [],
): readonly VisibleLine[] => {
  if (inlineChanges.length === 0) {
    return getVisibleRows(content, totalLineCount, minLineY, maxLineY).map((line, index) => ({
      lineNumber: minLineY + index + 1,
      tokens: getTokens(tokenizedLines, minLineY + index, line),
      type: VisibleLineTypeValue.Normal,
    }))
  }

  const lines = content ? content.split('\n') : ['']
  const otherLines = otherContent ? otherContent.split('\n') : ['']
  return getVisibleInlineDiffRows(inlineChanges)
    .slice(minLineY, maxLineY)
    .map((visibleRow) => {
      const inlineChange = side === 'left' ? visibleRow.leftChange : visibleRow.rightChange
      const type = inlineChange ? getVisibleLineType(inlineChange, side) : VisibleLineTypeValue.Normal
      const lineIndex = getInlineChangeLineIndex(inlineChange, side)
      const line = getLine(lines, lineIndex)
      const tokens = inlineChange && lineIndex >= 0 ? getTokens(tokenizedLines, lineIndex, line) : []
      const otherLineIndex = side === 'left' ? visibleRow.rightChange?.rightIndex : visibleRow.leftChange?.leftIndex
      const otherLine = typeof otherLineIndex === 'number' ? getLine(otherLines, otherLineIndex) : ''
      const visibleTokens = otherContent && isPairedChange(visibleRow) ? applyChangedRanges(tokens, getChangedRanges(line, otherLine)) : tokens
      return {
        lineNumber: lineIndex >= 0 ? lineIndex + 1 : -1,
        tokens: visibleTokens,
        type,
      }
    })
}
