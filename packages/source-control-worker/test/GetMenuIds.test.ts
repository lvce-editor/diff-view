import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'

test('getMenuIds - returns array with SourceControl menu entry id', (): void => {
  const result = getMenuIds()
  expect(result).toEqual([MenuEntryId.SourceControl])
})
