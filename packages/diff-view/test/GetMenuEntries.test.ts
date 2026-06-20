import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuEntries', (): void => {
  expect(getMenuEntries()).toEqual([
    {
      command: 'DiffView.handleCut',
      flags: MenuItemFlags.RestoreFocus,
      id: 'cut',
      label: 'Cut',
    },
    {
      command: 'DiffView.handleCopy',
      flags: MenuItemFlags.RestoreFocus,
      id: 'copy',
      label: 'Copy',
    },
    {
      command: 'DiffView.handlePaste',
      flags: MenuItemFlags.RestoreFocus,
      id: 'paste',
      label: 'Paste',
    },
  ])
})
