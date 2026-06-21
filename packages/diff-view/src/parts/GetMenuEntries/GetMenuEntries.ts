import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as DiffStrings from '../DiffStrings/DiffStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const menuEntryCut: MenuEntry = {
  command: 'DiffView.handleCut',
  flags: MenuItemFlags.RestoreFocus,
  id: 'cut',
  label: DiffStrings.cut(),
}

const menuEntryCopy: MenuEntry = {
  command: 'DiffView.handleCopy',
  flags: MenuItemFlags.RestoreFocus,
  id: 'copy',
  label: DiffStrings.copy(),
}

const menuEntryPaste: MenuEntry = {
  command: 'DiffView.handlePaste',
  flags: MenuItemFlags.RestoreFocus,
  id: 'paste',
  label: DiffStrings.paste(),
}

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [menuEntryCut, menuEntryCopy, menuEntryPaste]
}
