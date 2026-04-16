import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { getMenuEntries } from '../GetMenuEntries/GetMenuEntries.ts'

export const getMenuEntries2 = (state: DiffViewState): readonly MenuEntry[] => {
  return getMenuEntries()
}
