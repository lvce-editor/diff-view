import type { ActionsCache } from '../ActionsCache/ActionsCache.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Group } from '../Group/Group.ts'
import type { ViewMode } from '../ViewMode/ViewMode.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface SourceControlState {
  readonly actionsCache: ActionsCache
  readonly allGroups: readonly Group[]
  readonly assetDir: string
  readonly badgeCount: number
  readonly decorationIcons: readonly string[]
  readonly deltaY: number
  readonly enabledProviderIds: readonly string[]
  readonly expandedGroups: Readonly<Record<string, boolean>>
  readonly fileIconCache: FileIconCache
  readonly finalDeltaY: number
  readonly focus: number
  readonly gitRoot: string
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly history: readonly string[]
  readonly iconDefinitions: readonly string[]
  readonly id: number
  readonly index: readonly any[]
  readonly initial: boolean
  readonly inputBoxHeight: number
  readonly inputBoxMaxHeight: number
  readonly inputFontFamily: string
  readonly inputFontSize: number
  readonly inputFontWeight: number
  readonly inputLetterSpacing: number
  readonly inputLineHeight: number
  readonly inputPadding: number
  readonly inputPlaceholder: string
  readonly inputSource: number
  readonly inputValue: string
  readonly isVisible: boolean
  readonly itemHeight: number
  readonly items: readonly DisplayItem[]
  readonly maxInputLines: number
  readonly maxLineY: number
  readonly merge: readonly any[]
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly platform: number
  readonly providerId: string
  readonly root: string
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly splitButtonEnabled: boolean
  readonly untracked: readonly any[]
  readonly viewMode: ViewMode
  readonly visibleItems: readonly VisibleItem[]
  readonly width: number
  readonly workingTree: readonly any[]
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
