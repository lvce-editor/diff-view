import { expect, test } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { InlineDiffRowType } from '../src/parts/GetInlineDiffRows/GetInlineDiffRows.ts'
import { getInlineDiffRowClassName } from '../src/parts/GetInlineDiffRowClassName/GetInlineDiffRowClassName.ts'

test('getInlineDiffRowClassName returns deletion class for Deletion type', (): void => {
  const row = { lineNumberLeft: 1, lineNumberRight: null, text: 'removed', type: InlineDiffRowType.Deletion }
  expect(getInlineDiffRowClassName(row)).toBe(ClassNames.EditorRowDeletion)
})

test('getInlineDiffRowClassName returns git buttons class for GitButtons type', (): void => {
  const row = { lineNumberLeft: null, lineNumberRight: null, text: 'accept', type: InlineDiffRowType.GitButtons }
  expect(getInlineDiffRowClassName(row)).toBe(ClassNames.EditorRowGitButtons)
})

test('getInlineDiffRowClassName returns incoming change class for IncomingChange type', (): void => {
  const row = { lineNumberLeft: null, lineNumberRight: null, text: 'incoming', type: InlineDiffRowType.IncomingChange }
  expect(getInlineDiffRowClassName(row)).toBe(ClassNames.EditorRowIncomingChange)
})

test('getInlineDiffRowClassName returns insertion class for Insertion type', (): void => {
  const row = { lineNumberLeft: null, lineNumberRight: 2, text: 'added', type: InlineDiffRowType.Insertion }
  expect(getInlineDiffRowClassName(row)).toBe(ClassNames.EditorRowInsertion)
})

test('getInlineDiffRowClassName returns default class for unknown type', (): void => {
  const row = { lineNumberLeft: 1, lineNumberRight: 1, text: 'context', type: InlineDiffRowType.Context }
  expect(getInlineDiffRowClassName(row)).toBe(ClassNames.EditorRow)
})
