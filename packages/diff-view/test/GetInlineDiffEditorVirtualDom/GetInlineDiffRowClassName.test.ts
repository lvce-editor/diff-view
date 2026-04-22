import { expect, test } from '@jest/globals'
import * as ClassNames from '../../src/parts/ClassNames/ClassNames.ts'
import { getInlineDiffRowClassName } from '../../src/parts/GetInlineDiffEditorVirtualDom/GetInlineDiffRowClassName/GetInlineDiffRowClassName.ts'

test('getInlineDiffRowClassName returns the default row class for context rows', (): void => {
  const result = getInlineDiffRowClassName({
    lineNumberLeft: 1,
    lineNumberRight: 1,
    text: 'same',
    type: 'context',
  })

  expect(result).toBe(ClassNames.EditorRow)
})

test('getInlineDiffRowClassName returns the deletion row class for deletion rows', (): void => {
  const result = getInlineDiffRowClassName({
    lineNumberLeft: 1,
    lineNumberRight: null,
    text: 'removed',
    type: 'deletion',
  })

  expect(result).toBe(ClassNames.EditorRowDeletion)
})

test('getInlineDiffRowClassName returns the insertion row class for insertion rows', (): void => {
  const result = getInlineDiffRowClassName({
    lineNumberLeft: null,
    lineNumberRight: 2,
    text: 'added',
    type: 'insertion',
  })

  expect(result).toBe(ClassNames.EditorRowInsertion)
})
