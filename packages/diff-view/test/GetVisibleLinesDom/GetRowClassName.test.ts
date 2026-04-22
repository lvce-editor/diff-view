import { expect, test } from '@jest/globals'
import * as ClassNames from '../../src/parts/ClassNames/ClassNames.ts'
import { getRowClassName } from '../../src/parts/GetVisibleLinesDom/GetRowClassName/GetRowClassName.ts'
import { VisibleLineType } from '../../src/parts/VisibleLine/VisibleLine.ts'

test('getRowClassName returns the default editor row class for normal lines', (): void => {
  const result = getRowClassName(VisibleLineType.Normal)

  expect(result).toBe(ClassNames.EditorRow)
})

test('getRowClassName returns the deletion row class for removed lines', (): void => {
  const result = getRowClassName(VisibleLineType.Removed)

  expect(result).toBe(ClassNames.EditorRowDeletion)
})

test('getRowClassName returns the insertion row class for added lines', (): void => {
  const result = getRowClassName(VisibleLineType.Added)

  expect(result).toBe(ClassNames.EditorRowInsertion)
})
