import { expect, test } from '@jest/globals'
import { getInlineDiffLineNumberText } from '../../src/parts/GetInlineDiffEditorVirtualDom/GetInlineDiffLineNumberText/GetInlineDiffLineNumberText.ts'

test('getInlineDiffLineNumberText renders both line numbers', (): void => {
  const result = getInlineDiffLineNumberText({
    lineNumberLeft: 12,
    lineNumberRight: 34,
    text: 'unchanged',
    type: 'context',
  })

  expect(result).toBe('12 34')
})

test('getInlineDiffLineNumberText renders missing line numbers as dashes', (): void => {
  const result = getInlineDiffLineNumberText({
    lineNumberLeft: null,
    lineNumberRight: 5,
    text: 'inserted',
    type: 'insertion',
  })

  expect(result).toBe('- 5')
})
