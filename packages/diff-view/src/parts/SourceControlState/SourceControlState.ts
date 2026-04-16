import type { Group } from '../Group/Group.ts'
import type { ViewMode } from '../ViewMode/ViewMode.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface DiffViewState {
  readonly assetDir: string
  readonly minLineY: number
  readonly platform: number
  readonly root: string
  readonly width: number
  readonly x: number
  readonly y: number
}
