import { expect, test } from '@jest/globals'
import { InlineDiffRowType } from '../src/parts/GetInlineDiffRows/GetInlineDiffRows.ts'
import { getInlineDiffRowText } from '../src/parts/GetInlineDiffRowText/GetInlineDiffRowText.ts'

test('getInlineDiffRowText prefixes deletion rows with "- "', (): void => {
  const row = { lineNumberLeft: 1, lineNumberRight: null, text: 'removed', type: InlineDiffRowType.Deletion }
  expect(getInlineDiffRowText(row)).toBe('- removed')
})

test('getInlineDiffRowText returns text unchanged for GitButtons type', (): void => {
  const row = { lineNumberLeft: null, lineNumberRight: null, text: 'accept', type: InlineDiffRowType.GitButtons }
  expect(getInlineDiffRowText(row)).toBe('accept')
})

test('getInlineDiffRowText returns text unchanged for IncomingChange type', (): void => {
  const row = { lineNumberLeft: null, lineNumberRight: null, text: 'incoming', type: InlineDiffRowType.IncomingChange }
  expect(getInlineDiffRowText(row)).toBe('incoming')
})

test('getInlineDiffRowText prefixes insertion rows with "+ "', (): void => {
  const row = { lineNumberLeft: null, lineNumberRight: 2, text: 'added', type: InlineDiffRowType.Insertion }
  expect(getInlineDiffRowText(row)).toBe('+ added')
})

test('getInlineDiffRowText prefixes normal rows with spaces', (): void => {
  const row = { lineNumberLeft: 1, lineNumberRight: 1, text: 'context', type: InlineDiffRowType.Context }
  expect(getInlineDiffRowText(row)).toBe('  context')
})
