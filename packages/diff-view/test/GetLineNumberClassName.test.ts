import { expect, test } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { InlineDiffRowType } from '../src/parts/GetInlineDiffRows/GetInlineDiffRows.ts'
import { getLineNumberClassName } from '../src/parts/GetLineNumberClassName/GetLineNumberClassName.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('getLineNumberClassName returns the default line number class', (): void => {
  expect(getLineNumberClassName()).toBe(ClassNames.DiffEditorLineNumber)
  expect(getLineNumberClassName(VisibleLineType.Normal)).toBe(ClassNames.DiffEditorLineNumber)
  expect(getLineNumberClassName(InlineDiffRowType.Context)).toBe(ClassNames.DiffEditorLineNumber)
})

test('getLineNumberClassName returns the deletion line number class', (): void => {
  const expected = `${ClassNames.DiffEditorLineNumber} ${ClassNames.DiffEditorLineNumberDeletion}`

  expect(getLineNumberClassName(VisibleLineType.Removed)).toBe(expected)
  expect(getLineNumberClassName(InlineDiffRowType.Deletion)).toBe(expected)
})

test('getLineNumberClassName returns the insertion line number class', (): void => {
  const expected = `${ClassNames.DiffEditorLineNumber} ${ClassNames.DiffEditorLineNumberInsertion}`

  expect(getLineNumberClassName(VisibleLineType.Added)).toBe(expected)
  expect(getLineNumberClassName(InlineDiffRowType.Insertion)).toBe(expected)
})
