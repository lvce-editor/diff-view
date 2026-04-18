import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'

export type RenderMode = 'text' | 'image'
export type Layout = 'vertical' | 'horizontal'
export type DiffMode = 'inline' | 'side-by-side'

export interface DiffViewState {
  readonly assetDir: string
  readonly contentLeft: string
  readonly contentRight: string
  readonly deltaY: number
  readonly diffMode: DiffMode
  readonly errorLeftMessage: string
  readonly errorLeftStack: string
  readonly errorRightMessage: string
  readonly errorRightStack: string
  readonly finalDeltaY: number
  readonly focus: number
  readonly gitRoot: string
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly id: number
  readonly initial: boolean
  readonly inlineChanges: readonly InlineDiffChange[]
  readonly inputSource: number
  readonly inputValue: string
  readonly isResizing: boolean
  readonly isScrollBarDragging: boolean
  readonly isVisible: boolean
  readonly itemHeight: number
  readonly knownImageExtensions: readonly string[]
  readonly layout: Layout
  readonly leftWidth: number
  readonly lineNumbers: boolean
  readonly maxInputLines: number
  readonly maxLineY: number
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly platform: number
  readonly providerId: string
  readonly renderModeLeft: RenderMode
  readonly renderModeRight: RenderMode
  readonly resizeOffsetX: number
  readonly resizeOffsetY: number
  readonly rightWidth: number
  readonly root: string
  readonly scrollBarActive: boolean
  readonly scrollBarDragOffsetY: number
  readonly scrollBarHeight: number
  readonly splitButtonEnabled: boolean
  readonly totalLineCount: number
  readonly totalLineCountLeft: number
  readonly totalLineCountRight: number
  readonly uri: string
  readonly uriLeft: string
  readonly uriRight: string
  readonly viewMode: number
  readonly width: number
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
