import { expect, test } from '@jest/globals'
import { getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'

test('getMenuIds', (): void => {
  expect(getMenuIds()).toEqual([321_678])
})
