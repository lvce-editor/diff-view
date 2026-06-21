import { expect, test } from '@jest/globals'
import { getInlineDiffLineNumberText } from '../src/parts/GetInlineDiffLineNumberText/GetInlineDiffLineNumberText.ts'
import { InlineDiffRowType } from '../src/parts/GetInlineDiffRows/GetInlineDiffRows.ts'

test('getInlineDiffLineNumberText leaves absent line numbers blank', (): void => {
  expect(
    getInlineDiffLineNumberText({
      lineNumberLeft: 4,
      lineNumberRight: null,
      text: 'removed',
      type: InlineDiffRowType.Deletion,
    }),
  ).toBe('4 ')

  expect(
    getInlineDiffLineNumberText({
      lineNumberLeft: null,
      lineNumberRight: 5,
      text: 'inserted',
      type: InlineDiffRowType.Insertion,
    }),
  ).toBe(' 5')
})

test('getInlineDiffLineNumberText hides line numbers for decorator rows', (): void => {
  expect(
    getInlineDiffLineNumberText({
      lineNumberLeft: null,
      lineNumberRight: null,
      text: 'Accept current change | Accept incoming change | Accept both',
      type: InlineDiffRowType.GitButtons,
    }),
  ).toBe('')

  expect(
    getInlineDiffLineNumberText({
      lineNumberLeft: null,
      lineNumberRight: null,
      text: 'Incoming Change',
      type: InlineDiffRowType.IncomingChange,
    }),
  ).toBe('')
})
