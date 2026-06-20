import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const menuEntryCut: MenuEntry = {
  command: 'DiffView.handleCut',
  flags: MenuItemFlags.RestoreFocus,
  id: 'cut',
  label: 'Cut',
}

const menuEntryCopy: MenuEntry = {
  command: 'DiffView.handleCopy',
  flags: MenuItemFlags.RestoreFocus,
  id: 'copy',
  label: 'Copy',
}

const menuEntryPaste: MenuEntry = {
  command: 'DiffView.handlePaste',
  flags: MenuItemFlags.RestoreFocus,
  id: 'paste',
  label: 'Paste',
}

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [menuEntryCut, menuEntryCopy, menuEntryPaste]
}
