import type { ActionButton } from '../ActionButton/ActionButton.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'

export interface VisibleItem extends DisplayItem {
  readonly buttons: readonly ActionButton[]
  readonly fileIcon: string
  readonly indent: number
}
