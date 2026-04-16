import type { ActionButton } from '../ActionButton/ActionButton.ts'

export interface ActionsCache {
  readonly [key: string]: readonly ActionButton[]
}
