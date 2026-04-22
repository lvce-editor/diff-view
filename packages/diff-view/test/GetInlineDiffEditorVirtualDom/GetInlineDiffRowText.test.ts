import { expect, test } from '@jest/globals'
import { getInlineDiffRowText } from '../../src/parts/GetInlineDiffEditorVirtualDom/GetInlineDiffRowText/GetInlineDiffRowText.ts'

test('getInlineDiffRowText prefixes context rows with spaces', (): void => {
  const result = getInlineDiffRowText({
    lineNumberLeft: 1,
    lineNumberRight: 1,
    text: 'same',
    type: 'context',
  })

  expect(result).toBe('  same')
})

test('getInlineDiffRowText prefixes deletion rows with a minus sign', (): void => {
  const result = getInlineDiffRowText({
    lineNumberLeft: 1,
    lineNumberRight: null,
    text: 'removed',
    type: 'deletion',
  })

  expect(result).toBe('- removed')
})

test('getInlineDiffRowText prefixes insertion rows with a plus sign', (): void => {
  const result = getInlineDiffRowText({
    lineNumberLeft: null,
    lineNumberRight: 2,
    text: 'added',
    type: 'insertion',
  })

  expect(result).toBe('+ added')
})
